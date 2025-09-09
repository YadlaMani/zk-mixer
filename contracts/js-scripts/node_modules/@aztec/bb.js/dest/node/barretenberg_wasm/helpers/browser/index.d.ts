export declare function getSharedMemoryAvailable(): boolean;
export declare function getRemoteBarretenbergWasm<T>(worker: Worker): import("comlink").Remote<T>;
export declare function getNumCpu(): number;
export declare function threadLogger(): ((msg: string) => void) | undefined;
export declare function killSelf(): void;
export declare function getAvailableThreads(logger: (msg: string) => void): number;
/** The message expected by the `readinessListener`. */
export declare const Ready: {
    ready: boolean;
};
/** Listen for the readiness message from the Worker and call the `callback` once. */
export declare function readinessListener(worker: Worker, callback: () => void): void;
//# sourceMappingURL=index.d.ts.map