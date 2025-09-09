import { Barretenberg, Fr, UltraHonkBackend } from "@aztec/bb.js";
import { ethers } from "ethers";
import { Noir } from "@noir-lang/noir_js";
import path from "path";
import fs from "fs";
import { merkleTree } from "./MerkleTree";
const circuit = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../circuits/target/circuits.json"),
    "utf8"
  )
);

export default async function generateProof(): Promise<string> {
  const inputs = process.argv.slice(2);
  const nullifier = inputs[0];
  const secret = inputs[1];
  const receipient = inputs[2];
  const bb = await Barretenberg.new();
  const nullifier_hash = await bb.poseidon2Hash([Fr.fromString(nullifier)]);
  const commitment: Fr = await bb.poseidon2Hash([
    Fr.fromString(nullifier),
    Fr.fromString(secret),
  ]);

  const leaves = inputs.slice(3);
  const tree = await merkleTree(leaves);
  const merkle_proof = tree.proof(tree.getIndex(commitment.toString()));

  try {
    const noir = new Noir(circuit);
    const honk = new UltraHonkBackend(circuit.bytecode, { threads: 1 });
    // //public inputs
    // root: pub Field,
    // nullifier_hash: pub Field,
    // recipient: pub Field,
    // //private inputs
    // nullifier: Field,
    // secret: Field,
    // merkle_proof: [Field; 20],
    // is_even: [bool; 20],
    const input = {
      //Public inputs
      root: merkle_proof.root.toString(),
      nullifier_hash: nullifier_hash.toString(),
      recipient: receipient,
      //Private inputs
      nullifier: nullifier.toString(),
      secret: secret.toString(),
      merkle_proof: merkle_proof.pathElements.map((el) => el.toString()),
      is_even: merkle_proof.pathIndices.map((el) => el % 2 == 0),
    };
    const { witness } = await noir.execute(input);
    const originalLog = console.log;
    console.log = function () {};
    const { proof } = await honk.generateProof(witness, { keccak: true });
    const result = ethers.AbiCoder.defaultAbiCoder().encode(["bytes"], [proof]);
    console.log = originalLog;
    return result;
  } catch (error) {
    console.log("Error generating proof:", error);
    throw error;
  }
}
(async () => {
  generateProof()
    .then((res) => {
      process.stdout.write(res);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
})();
