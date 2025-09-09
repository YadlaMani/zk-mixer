"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThreadWorker = createThreadWorker;
const index_js_1 = require("../../../../log/index.js");
const index_js_2 = require("../../../helpers/browser/index.js");
async function createThreadWorker() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const worker = new Worker(new URL('./thread.worker.js', ""), { type: 'module' });
    worker.postMessage({ log: index_js_1.logOptions });
    await new Promise(resolve => (0, index_js_2.readinessListener)(worker, resolve));
    return worker;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fdGhyZWFkL2ZhY3RvcnkvYnJvd3Nlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLGdEQU9DO0FBVkQsdURBQXNEO0FBQ3RELGdFQUFzRTtBQUUvRCxLQUFLLFVBQVUsa0JBQWtCO0lBQ3RDLDZEQUE2RDtJQUM3RCxhQUFhO0lBQ2IsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzlGLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUscUJBQVUsRUFBRSxDQUFDLENBQUM7SUFDeEMsTUFBTSxJQUFJLE9BQU8sQ0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUEsNEJBQWlCLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdkUsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyJ9