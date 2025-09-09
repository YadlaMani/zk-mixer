"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ready = void 0;
exports.getSharedMemoryAvailable = getSharedMemoryAvailable;
exports.getRemoteBarretenbergWasm = getRemoteBarretenbergWasm;
exports.getNumCpu = getNumCpu;
exports.threadLogger = threadLogger;
exports.killSelf = killSelf;
exports.getAvailableThreads = getAvailableThreads;
exports.readinessListener = readinessListener;
const comlink_1 = require("comlink");
function getSharedMemoryAvailable() {
    const globalScope = typeof window !== 'undefined' ? window : globalThis;
    return typeof SharedArrayBuffer !== 'undefined' && globalScope.crossOriginIsolated;
}
function getRemoteBarretenbergWasm(worker) {
    return (0, comlink_1.wrap)(worker);
}
function getNumCpu() {
    return navigator.hardwareConcurrency;
}
function threadLogger() {
    return console.log;
}
function killSelf() {
    self.close();
}
function getAvailableThreads(logger) {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
        return navigator.hardwareConcurrency;
    }
    else {
        logger(`Could not detect environment to query number of threads. Falling back to one thread.`);
        return 1;
    }
}
// Solution to async initialization of workers, taken from
// https://github.com/GoogleChromeLabs/comlink/issues/635#issuecomment-1598913044
/** The message expected by the `readinessListener`. */
exports.Ready = { ready: true };
/** Listen for the readiness message from the Worker and call the `callback` once. */
function readinessListener(worker, callback) {
    worker.addEventListener('message', function ready(event) {
        if (!!event.data && event.data.ready === true) {
            worker.removeEventListener('message', ready);
            callback();
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vaGVscGVycy9icm93c2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDREQUdDO0FBRUQsOERBRUM7QUFFRCw4QkFFQztBQUVELG9DQUVDO0FBRUQsNEJBRUM7QUFFRCxrREFPQztBQVNELDhDQU9DO0FBOUNELHFDQUErQjtBQUUvQixTQUFnQix3QkFBd0I7SUFDdEMsTUFBTSxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN4RSxPQUFPLE9BQU8saUJBQWlCLEtBQUssV0FBVyxJQUFJLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQztBQUNyRixDQUFDO0FBRUQsU0FBZ0IseUJBQXlCLENBQUksTUFBYztJQUN6RCxPQUFPLElBQUEsY0FBSSxFQUFJLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFFRCxTQUFnQixTQUFTO0lBQ3ZCLE9BQU8sU0FBUyxDQUFDLG1CQUFtQixDQUFDO0FBQ3ZDLENBQUM7QUFFRCxTQUFnQixZQUFZO0lBQzFCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNyQixDQUFDO0FBRUQsU0FBZ0IsUUFBUTtJQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsTUFBNkI7SUFDL0QsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDdEUsT0FBTyxTQUFTLENBQUMsbUJBQW1CLENBQUM7SUFDdkMsQ0FBQztTQUFNLENBQUM7UUFDTixNQUFNLENBQUMsc0ZBQXNGLENBQUMsQ0FBQztRQUMvRixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7QUFDSCxDQUFDO0FBRUQsMERBQTBEO0FBQzFELGlGQUFpRjtBQUVqRix1REFBdUQ7QUFDMUMsUUFBQSxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFFckMscUZBQXFGO0FBQ3JGLFNBQWdCLGlCQUFpQixDQUFDLE1BQWMsRUFBRSxRQUFvQjtJQUNwRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQVMsS0FBSyxDQUFDLEtBQWlDO1FBQ2pGLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDOUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxRQUFRLEVBQUUsQ0FBQztRQUNiLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMifQ==