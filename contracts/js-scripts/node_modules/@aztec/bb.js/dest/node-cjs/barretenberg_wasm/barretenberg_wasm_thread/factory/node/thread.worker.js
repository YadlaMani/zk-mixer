"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const comlink_1 = require("comlink");
const index_js_1 = require("../../index.js");
const node_endpoint_js_1 = require("../../../helpers/node/node_endpoint.js");
const index_js_2 = require("../../../../log/node/index.js");
if (!worker_threads_1.parentPort) {
    throw new Error('No parentPort');
}
const endpoint = (0, node_endpoint_js_1.nodeEndpoint)(worker_threads_1.parentPort);
endpoint.addEventListener('message', (e) => {
    if (e.data.log) {
        (0, index_js_2.initLogger)(e.data.log);
    }
});
(0, comlink_1.expose)(new index_js_1.BarretenbergWasmThread(), endpoint);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWFkLndvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9iYXJyZXRlbmJlcmdfd2FzbS9iYXJyZXRlbmJlcmdfd2FzbV90aHJlYWQvZmFjdG9yeS9ub2RlL3RocmVhZC53b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBNEM7QUFDNUMscUNBQWlDO0FBQ2pDLDZDQUF3RDtBQUN4RCw2RUFBc0U7QUFDdEUsNERBQTJEO0FBRTNELElBQUksQ0FBQywyQkFBVSxFQUFFLENBQUM7SUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBQSwrQkFBWSxFQUFDLDJCQUFVLENBQUMsQ0FBQztBQUUxQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUU7SUFDOUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBQSxxQkFBVSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxnQkFBTSxFQUFDLElBQUksaUNBQXNCLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyJ9