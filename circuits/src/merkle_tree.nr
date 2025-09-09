use poseidon;
pub fn compute_merkle_root(leaf: Field, merkel_proof: [Field; 20], is_even: [bool; 20]) -> Field {
    //temporary variable to store the hash for the current level we are working on
    let mut hash: Field = leaf;
    //increment through levels
    for i in 0..20 {
        let (left, right) = if is_even[i] {
            (hash, merkel_proof[i])
        } else {
            (merkel_proof[i], hash)
        };
        hash = poseidon::poseidon2::Poseidon2::hash([left, right], 2);
    }
    hash
}
