"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOptions = void 0;
exports.initLogger = initLogger;
exports.createDebugLogger = createDebugLogger;
const pino_1 = require("pino");
const defaultOptions = {
    name: 'bb.js',
    useOnlyCustomLevels: false,
    customLevels: { verbose: 25 },
    browser: { asObject: false },
};
let logger;
function initLogger({ level = 'info' } = { level: 'info', useStdErr: false }) {
    if (logger) {
        return logger;
    }
    exports.logOptions = { level, useStdErr: false };
    logger = (0, pino_1.pino)({ ...defaultOptions, level });
}
function createDebugLogger(name) {
    initLogger();
    const sublogger = logger.child({
        name,
    });
    return (msg) => {
        sublogger.debug(msg);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9nL2Jyb3dzZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBaUJBLGdDQU1DO0FBRUQsOENBU0M7QUFsQ0QsK0JBQTRCO0FBSTVCLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLElBQUksRUFBRSxPQUFPO0lBQ2IsbUJBQW1CLEVBQUUsS0FBSztJQUMxQixZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0lBQzdCLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7Q0FDN0IsQ0FBQztBQU1GLElBQUksTUFBcUMsQ0FBQztBQUUxQyxTQUFnQixVQUFVLENBQUMsRUFBRSxLQUFLLEdBQUcsTUFBTSxLQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRTtJQUM3RixJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ1gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3pDLE1BQU0sR0FBRyxJQUFBLFdBQUksRUFBQyxFQUFFLEdBQUcsY0FBYyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLElBQVk7SUFDNUMsVUFBVSxFQUFFLENBQUM7SUFFYixNQUFNLFNBQVMsR0FBRyxNQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUk7S0FDTCxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBVyxFQUFFLEVBQUU7UUFDckIsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUM7QUFDSixDQUFDIn0=