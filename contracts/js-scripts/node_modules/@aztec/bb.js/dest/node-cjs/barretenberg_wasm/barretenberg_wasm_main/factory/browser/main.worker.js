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
(0, comlink_1.expose)(new index_js_1.BarretenbergWasmMain());
postMessage(index_js_2.Ready);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi53b3JrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc21fbWFpbi9mYWN0b3J5L2Jyb3dzZXIvbWFpbi53b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBaUM7QUFDakMsNkNBQXNEO0FBQ3RELGdFQUEwRDtBQUMxRCwrREFBOEQ7QUFFOUQsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzlCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUEscUJBQVUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsZ0JBQU0sRUFBQyxJQUFJLCtCQUFvQixFQUFFLENBQUMsQ0FBQztBQUNuQyxXQUFXLENBQUMsZ0JBQUssQ0FBQyxDQUFDIn0=