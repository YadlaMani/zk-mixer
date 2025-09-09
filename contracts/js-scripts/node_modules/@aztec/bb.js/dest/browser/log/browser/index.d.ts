import { LogOptions } from '../types.js';
import { Logger } from 'pino';
export declare let logOptions: LogOptions | undefined;
export declare function initLogger({ level }?: LogOptions): Logger<"verbose"> | undefined;
export declare function createDebugLogger(name: string): (msg: string) => void;
//# sourceMappingURL=index.d.ts.map