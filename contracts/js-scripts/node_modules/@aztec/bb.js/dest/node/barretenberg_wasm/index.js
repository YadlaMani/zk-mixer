import { getSharedMemoryAvailable, getAvailableThreads } from './helpers/node/index.js';
import { fetchCode } from './fetch_code/index.js';
import { createDebugLogger } from '../log/index.js';
export async function fetchModuleAndThreads(desiredThreads = 32, wasmPath, logger = createDebugLogger('fetch_mat')) {
    const shared = getSharedMemoryAvailable();
    const availableThreads = shared ? await getAvailableThreads(logger) : 1;
    // We limit the number of threads to 32 as we do not benefit from greater numbers.
    const limitedThreads = Math.min(desiredThreads, availableThreads, 32);
    logger(`Fetching bb wasm from ${wasmPath ?? 'default location'}`);
    const code = await fetchCode(shared, wasmPath);
    logger(`Compiling bb wasm of ${code.byteLength} bytes`);
    const module = await WebAssembly.compile(code);
    logger('Compilation of bb wasm complete');
    return { module, threads: limitedThreads };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE1BQU0sQ0FBQyxLQUFLLFVBQVUscUJBQXFCLENBQ3pDLGNBQWMsR0FBRyxFQUFFLEVBQ25CLFFBQWlCLEVBQ2pCLFNBQWdDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztJQUU5RCxNQUFNLE1BQU0sR0FBRyx3QkFBd0IsRUFBRSxDQUFDO0lBRTFDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsa0ZBQWtGO0lBQ2xGLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXRFLE1BQU0sQ0FBQyx5QkFBeUIsUUFBUSxJQUFJLGtCQUFrQixFQUFFLENBQUMsQ0FBQztJQUNsRSxNQUFNLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLHdCQUF3QixJQUFJLENBQUMsVUFBVSxRQUFRLENBQUMsQ0FBQztJQUN4RCxNQUFNLE1BQU0sR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDMUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUM7QUFDN0MsQ0FBQyJ9