import { BackendOptions, Barretenberg, CircuitOptions } from './index.js';
import { ProofData } from '../proof/index.js';
export declare class AztecClientBackendError extends Error {
    constructor(message: string);
}
/**
 * Options for the UltraHonkBackend.
 */
export type UltraHonkBackendOptions = {
    /** Selecting this option will use the keccak hash function instead of poseidon
     * when generating challenges in the proof.
     * Use this when you want to verify the created proof on an EVM chain.
     */
    keccak?: boolean;
    /** Selecting this option will use the keccak hash function instead of poseidon
     * when generating challenges in the proof.
     * Use this when you want to verify the created proof on an EVM chain.
     */
    keccakZK?: boolean;
    /** Selecting this option will use the poseidon/stark252 hash function instead of poseidon
     * when generating challenges in the proof.
     * Use this when you want to verify the created proof on an Starknet chain with Garaga.
     */
    starknet?: boolean;
    /** Selecting this option will use the poseidon/stark252 hash function instead of poseidon
     * when generating challenges in the proof.
     * Use this when you want to verify the created proof on an Starknet chain with Garaga.
     */
    starknetZK?: boolean;
};
export declare class UltraHonkBackend {
    protected backendOptions: BackendOptions;
    protected circuitOptions: CircuitOptions;
    protected api: Barretenberg;
    protected acirUncompressedBytecode: Uint8Array;
    constructor(acirBytecode: string, backendOptions?: BackendOptions, circuitOptions?: CircuitOptions);
    /** @ignore */
    private instantiate;
    generateProof(compressedWitness: Uint8Array, options?: UltraHonkBackendOptions): Promise<ProofData>;
    verifyProof(proofData: ProofData, options?: UltraHonkBackendOptions): Promise<boolean>;
    getVerificationKey(options?: UltraHonkBackendOptions): Promise<Uint8Array>;
    /** @description Returns a solidity verifier */
    getSolidityVerifier(vk?: Uint8Array): Promise<string>;
    generateRecursiveProofArtifacts(_proof: Uint8Array, _numOfPublicInputs: number): Promise<{
        proofAsFields: string[];
        vkAsFields: string[];
        vkHash: string;
    }>;
    destroy(): Promise<void>;
}
export declare class AztecClientBackend {
    protected acirBuf: Uint8Array[];
    protected options: BackendOptions;
    protected api: Barretenberg;
    constructor(acirBuf: Uint8Array[], options?: BackendOptions);
    /** @ignore */
    private instantiate;
    prove(witnessBuf: Uint8Array[], vksBuf?: Uint8Array[]): Promise<[Uint8Array, Uint8Array]>;
    verify(proof: Uint8Array, vk: Uint8Array): Promise<boolean>;
    gates(): Promise<number[]>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=backend.d.ts.map