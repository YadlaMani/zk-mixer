"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comlink_1 = require("comlink");
const index_js_1 = require("../../index.js");
const index_js_2 = require("../../../helpers/browser/index.js");
const index_js_3 = require("../../../../log/browser/index.js");
addEventListener('message', e => {
    if (e.data.log) {
        (0, index_js_3.initLogger)(e.data.log);
    }
});
(0, comlink_1.expose)(new index_js_1.BarretenbergWasmThread());
postMessage(index_js_2.Ready);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWFkLndvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9iYXJyZXRlbmJlcmdfd2FzbS9iYXJyZXRlbmJlcmdfd2FzbV90aHJlYWQvZmFjdG9yeS9icm93c2VyL3RocmVhZC53b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBaUM7QUFDakMsNkNBQXdEO0FBQ3hELGdFQUEwRDtBQUMxRCwrREFBOEQ7QUFFOUQsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzlCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUEscUJBQVUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsZ0JBQU0sRUFBQyxJQUFJLGlDQUFzQixFQUFFLENBQUMsQ0FBQztBQUNyQyxXQUFXLENBQUMsZ0JBQUssQ0FBQyxDQUFDIn0=