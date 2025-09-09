"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchModuleAndThreads = fetchModuleAndThreads;
const index_js_1 = require("./helpers/node/index.js");
const index_js_2 = require("./fetch_code/index.js");
const index_js_3 = require("../log/index.js");
async function fetchModuleAndThreads(desiredThreads = 32, wasmPath, logger = (0, index_js_3.createDebugLogger)('fetch_mat')) {
    const shared = (0, index_js_1.getSharedMemoryAvailable)();
    const availableThreads = shared ? await (0, index_js_1.getAvailableThreads)(logger) : 1;
    // We limit the number of threads to 32 as we do not benefit from greater numbers.
    const limitedThreads = Math.min(desiredThreads, availableThreads, 32);
    logger(`Fetching bb wasm from ${wasmPath ?? 'default location'}`);
    const code = await (0, index_js_2.fetchCode)(shared, wasmPath);
    logger(`Compiling bb wasm of ${code.byteLength} bytes`);
    const module = await WebAssembly.compile(code);
    logger('Compilation of bb wasm complete');
    return { module, threads: limitedThreads };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxzREFpQkM7QUFyQkQsc0RBQXdGO0FBQ3hGLG9EQUFrRDtBQUNsRCw4Q0FBb0Q7QUFFN0MsS0FBSyxVQUFVLHFCQUFxQixDQUN6QyxjQUFjLEdBQUcsRUFBRSxFQUNuQixRQUFpQixFQUNqQixTQUFnQyxJQUFBLDRCQUFpQixFQUFDLFdBQVcsQ0FBQztJQUU5RCxNQUFNLE1BQU0sR0FBRyxJQUFBLG1DQUF3QixHQUFFLENBQUM7SUFFMUMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBQSw4QkFBbUIsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLGtGQUFrRjtJQUNsRixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV0RSxNQUFNLENBQUMseUJBQXlCLFFBQVEsSUFBSSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7SUFDbEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLG9CQUFTLEVBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLFVBQVUsUUFBUSxDQUFDLENBQUM7SUFDeEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQzFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxDQUFDO0FBQzdDLENBQUMifQ==