import { Barretenberg, Fr } from "@aztec/bb.js";
import { ethers } from "ethers";
export default async function generateCommitment(): Promise<string> {
  const bb = await Barretenberg.new();
  const nullifier = Fr.random();
  const secret = Fr.random();
  const commitment: Fr = await bb.poseidon2Hash([nullifier, secret]);
  const result = ethers.AbiCoder.defaultAbiCoder().encode(
    ["bytes32", "bytes32", "bytes32"],
    [commitment.toBuffer(), nullifier.toBuffer(), secret.toBuffer()]
  );
  return result;
}

(async () => {
  generateCommitment()
    .then((res) => {
      process.stdout.write(res);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
})();
