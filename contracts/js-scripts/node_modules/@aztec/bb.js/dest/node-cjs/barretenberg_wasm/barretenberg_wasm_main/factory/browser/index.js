"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMainWorker = createMainWorker;
const index_js_1 = require("../../../../log/index.js");
const index_js_2 = require("../../../helpers/browser/index.js");
async function createMainWorker() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const worker = new Worker(new URL('./main.worker.js', ""), { type: 'module' });
    worker.postMessage({ log: index_js_1.logOptions });
    await new Promise(resolve => (0, index_js_2.readinessListener)(worker, resolve));
    return worker;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fbWFpbi9mYWN0b3J5L2Jyb3dzZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSw0Q0FPQztBQVZELHVEQUFzRDtBQUN0RCxnRUFBc0U7QUFFL0QsS0FBSyxVQUFVLGdCQUFnQjtJQUNwQyw2REFBNkQ7SUFDN0QsYUFBYTtJQUNiLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM1RixNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLHFCQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sSUFBSSxPQUFPLENBQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFBLDRCQUFpQixFQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMifQ==