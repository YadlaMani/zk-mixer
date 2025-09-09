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
};
const defaultLevel = parseLogLevel(process.env.LOG_LEVEL);
let logger;
function initLogger({ level = defaultLevel, useStdErr = false } = { level: defaultLevel, useStdErr: false }) {
    if (logger) {
        return logger;
    }
    exports.logOptions = { level, useStdErr };
    const transport = pino_1.pino.transport({
        target: 'pino/file',
        options: { destination: useStdErr ? 2 : 1 },
    });
    logger = (0, pino_1.pino)({ ...defaultOptions, level }, transport);
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
function parseLogLevel(logLevel) {
    if (!logLevel) {
        return 'info';
    }
    const knownLogLevels = ['info', 'debug', 'warn', 'error', 'trace', 'silent', 'verbose'];
    const [defaultLogLevel] = logLevel.split(';');
    return knownLogLevels.indexOf(defaultLogLevel) !== -1 ? defaultLogLevel : 'info';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9nL25vZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBaUJBLGdDQVlDO0FBRUQsOENBU0M7QUF4Q0QsK0JBQW9DO0FBR3BDLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLElBQUksRUFBRSxPQUFPO0lBQ2IsbUJBQW1CLEVBQUUsS0FBSztJQUMxQixZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0NBQzlCLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQU0xRCxJQUFJLE1BQXFDLENBQUM7QUFFMUMsU0FBZ0IsVUFBVSxDQUN4QixFQUFFLEtBQUssR0FBRyxZQUFZLEVBQUUsU0FBUyxHQUFHLEtBQUssS0FBaUIsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUU7SUFFbkcsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNYLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxrQkFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQ2xDLE1BQU0sU0FBUyxHQUFHLFdBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsTUFBTSxFQUFFLFdBQVc7UUFDbkIsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7S0FDNUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxHQUFHLElBQUEsV0FBSSxFQUFDLEVBQUUsR0FBRyxjQUFjLEVBQUUsS0FBSyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLElBQVk7SUFDNUMsVUFBVSxFQUFFLENBQUM7SUFFYixNQUFNLFNBQVMsR0FBRyxNQUFPLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUk7S0FDTCxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBVyxFQUFFLEVBQUU7UUFDckIsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsUUFBaUI7SUFDdEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sY0FBYyxHQUFnQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JHLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlDLE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxlQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLGVBQTZCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUMvRyxDQUFDIn0=