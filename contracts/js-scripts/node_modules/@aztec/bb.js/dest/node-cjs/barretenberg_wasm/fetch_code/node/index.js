"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCode = fetchCode;
const tslib_1 = require("tslib");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const url_1 = require("url");
const pako_1 = tslib_1.__importDefault(require("pako"));
function getCurrentDir() {
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return (0, path_1.dirname)((0, url_1.fileURLToPath)(""));
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchCode(multithreaded, wasmPath) {
    const path = wasmPath ?? getCurrentDir() + '/../../barretenberg-threads.wasm.gz';
    // Default bb wasm is compressed, but user could point it to a non-compressed version
    const maybeCompressedData = await (0, promises_1.readFile)(path);
    const buffer = new Uint8Array(maybeCompressedData);
    const isGzip = 
    // Check magic number
    buffer[0] === 0x1f &&
        buffer[1] === 0x8b &&
        // Check compression method:
        buffer[2] === 0x08;
    if (isGzip) {
        const decompressedData = pako_1.default.ungzip(buffer);
        return decompressedData.buffer;
    }
    else {
        return buffer;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vZmV0Y2hfY29kZS9ub2RlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBZ0JBLDhCQWlCQzs7QUFqQ0QsMENBQXVDO0FBQ3ZDLCtCQUErQjtBQUMvQiw2QkFBb0M7QUFDcEMsd0RBQXdCO0FBRXhCLFNBQVMsYUFBYTtJQUNwQixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7U0FBTSxDQUFDO1FBQ04sNkRBQTZEO1FBQzdELGFBQWE7UUFDYixPQUFPLElBQUEsY0FBTyxFQUFDLElBQUEsbUJBQWEsRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztBQUNILENBQUM7QUFFRCw2REFBNkQ7QUFDdEQsS0FBSyxVQUFVLFNBQVMsQ0FBQyxhQUFzQixFQUFFLFFBQWlCO0lBQ3ZFLE1BQU0sSUFBSSxHQUFHLFFBQVEsSUFBSSxhQUFhLEVBQUUsR0FBRyxxQ0FBcUMsQ0FBQztJQUNqRixxRkFBcUY7SUFDckYsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLElBQUEsbUJBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxNQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sTUFBTTtJQUNWLHFCQUFxQjtJQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSTtRQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSTtRQUNsQiw0QkFBNEI7UUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQztJQUNyQixJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ1gsTUFBTSxnQkFBZ0IsR0FBRyxjQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sZ0JBQWdCLENBQUMsTUFBNEMsQ0FBQztJQUN2RSxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7QUFDSCxDQUFDIn0=