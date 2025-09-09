import { wrap } from 'comlink';
export function getSharedMemoryAvailable() {
    const globalScope = typeof window !== 'undefined' ? window : globalThis;
    return typeof SharedArrayBuffer !== 'undefined' && globalScope.crossOriginIsolated;
}
export function getRemoteBarretenbergWasm(worker) {
    return wrap(worker);
}
export function getNumCpu() {
    return navigator.hardwareConcurrency;
}
export function threadLogger() {
    return console.log;
}
export function killSelf() {
    self.close();
}
export function getAvailableThreads(logger) {
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
export const Ready = { ready: true };
/** Listen for the readiness message from the Worker and call the `callback` once. */
export function readinessListener(worker, callback) {
    worker.addEventListener('message', function ready(event) {
        if (!!event.data && event.data.ready === true) {
            worker.removeEventListener('message', ready);
            callback();
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vaGVscGVycy9icm93c2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFL0IsTUFBTSxVQUFVLHdCQUF3QjtJQUN0QyxNQUFNLFdBQVcsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ3hFLE9BQU8sT0FBTyxpQkFBaUIsS0FBSyxXQUFXLElBQUksV0FBVyxDQUFDLG1CQUFtQixDQUFDO0FBQ3JGLENBQUM7QUFFRCxNQUFNLFVBQVUseUJBQXlCLENBQUksTUFBYztJQUN6RCxPQUFPLElBQUksQ0FBSSxNQUFNLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVM7SUFDdkIsT0FBTyxTQUFTLENBQUMsbUJBQW1CLENBQUM7QUFDdkMsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZO0lBQzFCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNyQixDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVE7SUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxNQUE2QjtJQUMvRCxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN0RSxPQUFPLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztJQUN2QyxDQUFDO1NBQU0sQ0FBQztRQUNOLE1BQU0sQ0FBQyxzRkFBc0YsQ0FBQyxDQUFDO1FBQy9GLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztBQUNILENBQUM7QUFFRCwwREFBMEQ7QUFDMUQsaUZBQWlGO0FBRWpGLHVEQUF1RDtBQUN2RCxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFFckMscUZBQXFGO0FBQ3JGLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxNQUFjLEVBQUUsUUFBb0I7SUFDcEUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxTQUFTLEtBQUssQ0FBQyxLQUFpQztRQUNqRixJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0MsUUFBUSxFQUFFLENBQUM7UUFDYixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIn0=