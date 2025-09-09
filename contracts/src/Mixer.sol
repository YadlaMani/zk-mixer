//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IMT.sol";
import {Poseidon2} from "../lib/poseidon2-evm/src/Poseidon2.sol";
import {IVerifier} from "./Verifier.sol";
import {ReentrancyGuard} from "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";

/// @title Mixer - A simple Tornado-like mixer
/// @notice Allows users to deposit and withdraw fixed denomination ETH privately using zkSNARKs
contract Mixer is IMT, ReentrancyGuard {
    IVerifier public immutable i_verifier;

    /// @notice Mapping to track submitted commitments
    mapping(bytes32 => bool) s_commitments;

    /// @notice Mapping to track used nullifiers (prevents double-spend)
    mapping(bytes32 => bool) public s_nullifiersHashes;

    /// @notice Fixed denomination of each deposit
    uint256 public constant DENOMINATION = 0.001 ether;

    /// @notice Emitted when a user withdraws
    /// @param to recipient address
    /// @param nullifierHash used nullifier hash
    event Withdraw(address indexed to, bytes32 nullifierHash);

    /// @notice Emitted when a deposit is made
    /// @param commitment Poseidon commitment
    /// @param leafIndex position in the Merkle tree
    /// @param timestamp block timestamp of deposit
    event Deposit(bytes32 indexed commitment, uint32 leafIndex, uint256 timestamp);

    error Mixer__CommitmentAlreadySubmitted(bytes32 commitment);
    error Mixer__InvalidDenomination(uint256 sent, uint256 required);
    error Mixer__UnknownRoot(bytes32 root);
    error Mixer__NullifierAlreadyUsed(bytes32 nullifier);
    error Mixer__InvalidProof();
    error Mixer__PaymentFailed(address to, uint256 amount);

    /// @param _verifier zkSNARK verifier contract
    /// @param _hasher Poseidon hasher contract
    /// @param _merkleTreeDepth depth of the incremental Merkle tree
    constructor(
        IVerifier _verifier,
        Poseidon2 _hasher,
        uint32 _merkleTreeDepth
    ) IMT(_merkleTreeDepth, _hasher) {
        i_verifier = _verifier;
    }

    /// @notice Deposit fixed denomination ETH into the mixer
    /// @param _commitment Poseidon commitment (nullifier + secret, generated off-chain)
    function deposit(bytes32 _commitment) external payable nonReentrant {
        if (s_commitments[_commitment]) {
            revert Mixer__CommitmentAlreadySubmitted(_commitment);
        }
        if (msg.value != DENOMINATION) {
            revert Mixer__InvalidDenomination(msg.value, DENOMINATION);
        }

        s_commitments[_commitment] = true;
        uint32 insertedIndex = _insert(_commitment);

        emit Deposit(_commitment, insertedIndex, block.timestamp);
    }

    /// @notice Withdraw funds using a zkSNARK proof
    /// @param _proof zkSNARK proof
    /// @param _root Merkle root used in the proof
    /// @param _nullifierHash hash of the nullifier (prevents double spending)
    /// @param _receipient address receiving the withdrawn funds
    function witdraw(
        bytes memory _proof,
        bytes32 _root,
        bytes32 _nullifierHash,
        address payable _receipient
    ) external {
        if (!isKnownRoot(_root)) {
            revert Mixer__UnknownRoot(_root);
        }
        if (s_nullifiersHashes[_nullifierHash]) {
            revert Mixer__NullifierAlreadyUsed(_nullifierHash);
        }

        bytes32[] memory publicInputs = new bytes32[](3);
        publicInputs[0] = _root;
        publicInputs[1] = _nullifierHash;
        publicInputs[2] = bytes32(uint256(uint160(address(_receipient))));

        if (!i_verifier.verify(_proof, publicInputs)) {
            revert Mixer__InvalidProof();
        }

        s_nullifiersHashes[_nullifierHash] = true;

        (bool success, ) = _receipient.call{value: DENOMINATION}("");
        if (!success) {
            revert Mixer__PaymentFailed(_receipient, DENOMINATION);
        }

        emit Withdraw(_receipient, _nullifierHash);
    }
}
