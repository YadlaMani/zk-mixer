# ZK Mixer

- Deposit : users can deposit ETH into the mixer to break the connection between depositor and withdrawer
- Withdraw:users will withdraw using a zk proof (Noir -generated off-chain) of knowledge of their deposit
- We will only allow users to deposit a fixed amount of eth (0.001)

## Proof

- calculate the commitment using the secret and nullifier
- We need to check that the commitment is present in the merklee tree
  - proposed root
  - merkle proof
- Check the nullifier matches the (public) nullifier hash

### Private inputs

- Secret
- Nullifier
- Merkle proof (intermediate node required to reconstruct the tree)
- Boolean to say whether node has a even index

### Public Inputs

- proposed root
- nullifier hash
# zk-mixer
