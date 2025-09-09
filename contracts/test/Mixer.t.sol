//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {Test, console} from "forge-std/Test.sol";
import {Mixer} from "../src/Mixer.sol";
import {HonkVerifier} from "../src/Verifier.sol";
import {IMT,Poseidon2} from "../src/IMT.sol";
contract MixerTest is Test{
    Mixer public mixer;
    HonkVerifier public verifier;
    Poseidon2 public hasher;

    address public recipient=makeAddr("recipient");
    function setUp() public{
        //deploy the verifier
        verifier=new HonkVerifier();
        //deploy the hasher contracts
        hasher=new Poseidon2();
        //deploy the mixer
        mixer=new Mixer(verifier,hasher,20);
    }
    function  _getCommitment() public returns(bytes32 _commitment,bytes32 _nullifier,bytes32 _secret){
        string [] memory inputs=new string[](3);
        inputs[0]="npx";
        inputs[1]="tsx";
        
        inputs[2]="js-scripts/generateCommitment.ts";
        //use ffi to run scripts in the cli to create the commitment
        bytes memory result=vm.ffi(inputs);
        //decode the result to get the commitment
        ( _commitment,_nullifier,_secret)=abi.decode(result,(bytes32,bytes32,bytes32));
        //ABI decode the result 
         


    }
    function _getProof(bytes32 _nullifier,bytes32 _secret,address _receipent,bytes32[] memory leaves)internal returns (bytes memory _proof, bytes32[] memory publicInputs){
        string[] memory inputs=new string[](6+leaves.length);
        inputs[0]="npx";
        inputs[1]="tsx";
        inputs[2]="js-scripts/generateProof.ts";
        inputs[3]=vm.toString(_nullifier);
        inputs[4]=vm.toString(_secret);
        inputs[5]=vm.toString(bytes32(uint256(uint160(_receipent))));
        for(uint256 i=0;i<leaves.length;i++){
            inputs[6+i]=vm.toString(leaves[i]);
        }
        bytes memory result=vm.ffi(inputs);
      (_proof, publicInputs) = abi.decode(result, (bytes, bytes32[]));
    }
    function testMakeDeposit() public{
        //create a commitment
        //make a deposit
        (bytes32 _commitment,,)=_getCommitment();
        console.log("Commitment:");
        console.logBytes32(_commitment);
        vm.expectEmit(true,false,false,true);
        emit Mixer.Deposit(_commitment,0,uint256(block.timestamp));
        mixer.deposit{value:mixer.DENOMINATION()}(_commitment);
        
    }
    function testMakeWithdrawel() public{
        //make a deposit
        (bytes32 _commitment,bytes32 _nullifier,bytes32 _secret)=_getCommitment();
        console.log("Commitment:");
        console.logBytes32(_commitment);
        vm.expectEmit(true,false,false,true);
        emit Mixer.Deposit(_commitment,0,uint256(block.timestamp));
        mixer.deposit{value:mixer.DENOMINATION()}(_commitment);
        //retrieving leaves
        bytes32[] memory leaves=new bytes32[](1);
        leaves[0]=_commitment;
        //create a proof
        (bytes memory _proof, bytes32[] memory _publicInputs) = _getProof(_nullifier, _secret, recipient, leaves);
       
        //make a withdrawel
        assertTrue(verifier.verify(_proof, _publicInputs));
        assertEq(recipient.balance,0);
        assertEq(address(mixer).balance,mixer.DENOMINATION());
        mixer.witdraw(_proof,_publicInputs[0],_publicInputs[1],payable(recipient));
        assertEq(recipient.balance,mixer.DENOMINATION());
        assertEq(address(mixer).balance,0);


    }
}