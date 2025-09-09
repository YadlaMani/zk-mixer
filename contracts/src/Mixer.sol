//SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;
import "./IMT.sol";
import {Poseidon2} from "../lib/poseidon2-evm/src/Poseidon2.sol";
import {IVerifier} from "./Verifier.sol";
contract Mixer  is IMT{
    IVerifier public immutable i_verifier;
    //mapping to store whether a commitment has been already submitted
    mapping(bytes32=>bool) s_commitments;
    mapping(bytes32=>bool) public s_nullifiersHashes;


    //the denomination of the deposit 
    uint256 public constant DENOMINATION = 0.001 ether;

    event Withdraw(address indexed to,bytes32 nullifierHash);
    event Deposit(address indexed from,bytes32 commitment,uint32 leafIndex,uint256 timestamp);



    event Deposit(bytes32 indexed commitment,uint32 leafIndex,uint256 timestamp);
    error Mixer__CommitmentAlreadySubmitted(bytes32 commitment);
    error Mixer__InvalidDenomination(uint256 sent, uint256 required);
    error Mixer__UnknownRoot(bytes32 root);
    error Mixer__NullifierAlreadyUsed(bytes32 nullifier);
    error Mixer__InvalidProof();
    error Mixer__PaymentFailed(address to,uint256 amount);
    constructor(IVerifier _verifier,Poseidon2 _hasher,uint32 _merkleTreeDepth)IMT(_merkleTreeDepth,_hasher){
        i_verifier = _verifier;

    }
    /// @notice Deposit funds into the mixer
    /// @param _commitment the poseiden commitment of the nullifier and secret(generated off-chain)
    function deposit(bytes32 _commitment) external payable{
        //check whether the commitment has already been used so we can prevent a deposit being added twice
        if(s_commitments[_commitment]){
            revert Mixer__CommitmentAlreadySubmitted(_commitment);
        }
        //check that the amout of eth is the correct denomination
        if(msg.value!=DENOMINATION){
            revert Mixer__InvalidDenomination(msg.value,DENOMINATION);
        }

        // add the commitment to a on-chain incremental merkle tree containing all the commitments
        s_commitments[_commitment]=true;
       uint32 insertedIndex= _insert(_commitment);
        emit Deposit(_commitment,insertedIndex,block.timestamp);
    }
    /// @notice Withdraw funds from the mixer in a private way
    /// @param _proof the proof that the user has the right to withdraw (they know a vaild commitment)
    function witdraw(bytes memory _proof,bytes32 _root,bytes32 _nullifierHash,address payable _receipient) external{
        // check that the root that was used in the proof matches the root on-chain
        if(!isKnownRoot(_root)){
            revert Mixer__UnknownRoot(_root);
        }
        // check that the proof is valid by calling the verifer contract
        if(s_nullifiersHashes[_nullifierHash]){
            revert Mixer__NullifierAlreadyUsed(_nullifierHash);
        }
        bytes32[] memory publicInputs=new bytes32[](3);
        publicInputs[0]=_root;
        publicInputs[1]=_nullifierHash;
        publicInputs[2]=bytes32(uint256(uint160(address(_receipient))));
        if(!i_verifier.verify(_proof,publicInputs)){
            revert Mixer__InvalidProof();
        }
        // check that the nullifier has not yet been used to prevent dobule spending
        s_nullifiersHashes[_nullifierHash]=true;
        //send them the funds
        (bool sucess,)=_receipient.call{value:DENOMINATION}("");
        if(!sucess){
            revert Mixer__PaymentFailed(_receipient,DENOMINATION);
        }
        emit Withdraw(_receipient,_nullifierHash);
    }
}