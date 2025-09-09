import { pino } from 'pino';
const defaultOptions = {
    name: 'bb.js',
    useOnlyCustomLevels: false,
    customLevels: { verbose: 25 },
    browser: { asObject: false },
};
// Options must be exposed so they can be provided to threads upon creation
// This way we ensure all loggers are spawned with the same options
export let logOptions;
let logger;
export function initLogger({ level = 'info' } = { level: 'info', useStdErr: false }) {
    if (logger) {
        return logger;
    }
    logOptions = { level, useStdErr: false };
    logger = pino({ ...defaultOptions, level });
}
export function createDebugLogger(name) {
    initLogger();
    const sublogger = logger.child({
        name,
    });
    return (msg) => {
        sublogger.debug(msg);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9nL2Jyb3dzZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUk1QixNQUFNLGNBQWMsR0FBRztJQUNyQixJQUFJLEVBQUUsT0FBTztJQUNiLG1CQUFtQixFQUFFLEtBQUs7SUFDMUIsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtJQUM3QixPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0NBQzdCLENBQUM7QUFFRiwyRUFBMkU7QUFDM0UsbUVBQW1FO0FBQ25FLE1BQU0sQ0FBQyxJQUFJLFVBQWtDLENBQUM7QUFFOUMsSUFBSSxNQUFxQyxDQUFDO0FBRTFDLE1BQU0sVUFBVSxVQUFVLENBQUMsRUFBRSxLQUFLLEdBQUcsTUFBTSxLQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRTtJQUM3RixJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ1gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDekMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsY0FBYyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxJQUFZO0lBQzVDLFVBQVUsRUFBRSxDQUFDO0lBRWIsTUFBTSxTQUFTLEdBQUcsTUFBTyxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJO0tBQ0wsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLEdBQVcsRUFBRSxFQUFFO1FBQ3JCLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyJ9