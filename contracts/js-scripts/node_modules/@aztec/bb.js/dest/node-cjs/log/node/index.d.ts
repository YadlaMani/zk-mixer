import { Logger } from 'pino';
import { LogOptions } from '../types.js';
export declare let logOptions: LogOptions | undefined;
export declare function initLogger({ level, useStdErr }?: LogOptions): Logger<"verbose"> | undefined;
export declare function createDebugLogger(name: string): (msg: string) => void;
//# sourceMappingURL=index.d.ts.map