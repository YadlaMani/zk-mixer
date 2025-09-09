"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedMemoryAvailable = getSharedMemoryAvailable;
exports.getRemoteBarretenbergWasm = getRemoteBarretenbergWasm;
exports.getNumCpu = getNumCpu;
exports.threadLogger = threadLogger;
exports.killSelf = killSelf;
exports.getAvailableThreads = getAvailableThreads;
const tslib_1 = require("tslib");
const os_1 = tslib_1.__importDefault(require("os"));
const comlink_1 = require("comlink");
const node_endpoint_js_1 = require("./node_endpoint.js");
const fs_1 = require("fs");
function getSharedMemoryAvailable() {
    return true;
}
/**
 * Comlink allows you to produce a Proxy to the worker, enabling you to call methods as if it were a normal class.
 * Note we give it the type information it needs so the returned Proxy object looks like that type.
 * Node has a different implementation, needing this nodeEndpoint wrapper, hence this function exists here.
 */
function getRemoteBarretenbergWasm(worker) {
    return (0, comlink_1.wrap)((0, node_endpoint_js_1.nodeEndpoint)(worker));
}
/**
 * Returns number of cpus as reported by the system, unless overriden by HARDWARE_CONCURRENCY env var.
 */
function getNumCpu() {
    return +process.env.HARDWARE_CONCURRENCY || os_1.default.cpus().length;
}
/**
 * In node, the message passing is different to the browser. When using 'debug' in the browser, we seemingly always
 * get our logs, but in node it looks like it's dependent on the chain of workers from child to main thread be
 * unblocked. If one of our threads aborts, we can't see it as the parent is blocked waiting on threads to join.
 * To work around this in node, threads will by default write directly to stdout.
 */
function threadLogger() {
    return (msg) => {
        (0, fs_1.writeSync)(1, msg + '\n');
    };
}
function killSelf() {
    // Extordinarily hard process termination. Due to how parent threads block on child threads etc, even process.exit
    // doesn't seem to be able to abort the process. The following does.
    process.kill(process.pid);
    throw new Error();
}
function getAvailableThreads(logger) {
    try {
        return os_1.default.cpus().length;
    }
    catch (e) {
        logger(`Could not detect environment to query number of threads. Falling back to one thread. Error: ${e.message ?? e}`);
        return 1;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vaGVscGVycy9ub2RlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsNERBRUM7QUFPRCw4REFFQztBQUtELDhCQUVDO0FBUUQsb0NBSUM7QUFFRCw0QkFLQztBQUVELGtEQVNDOztBQXJERCxvREFBb0I7QUFDcEIscUNBQStCO0FBQy9CLHlEQUFrRDtBQUNsRCwyQkFBK0I7QUFFL0IsU0FBZ0Isd0JBQXdCO0lBQ3RDLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQix5QkFBeUIsQ0FBSSxNQUFjO0lBQ3pELE9BQU8sSUFBQSxjQUFJLEVBQUksSUFBQSwrQkFBWSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsU0FBUztJQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBcUIsSUFBSSxZQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQ2hFLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLFlBQVk7SUFDMUIsT0FBTyxDQUFDLEdBQVcsRUFBRSxFQUFFO1FBQ3JCLElBQUEsY0FBUyxFQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQWdCLFFBQVE7SUFDdEIsa0hBQWtIO0lBQ2xILG9FQUFvRTtJQUNwRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7QUFDcEIsQ0FBQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLE1BQTZCO0lBQy9ELElBQUksQ0FBQztRQUNILE9BQU8sWUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBQUMsT0FBTyxDQUFNLEVBQUUsQ0FBQztRQUNoQixNQUFNLENBQ0osK0ZBQStGLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQ2hILENBQUM7UUFDRixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7QUFDSCxDQUFDIn0=