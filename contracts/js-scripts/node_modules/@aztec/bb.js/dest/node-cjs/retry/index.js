"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backoffGenerator = backoffGenerator;
exports.makeBackoff = makeBackoff;
exports.retry = retry;
/**
 * Generates a backoff sequence for retrying operations with an increasing delay.
 * The backoff sequence follows this pattern: 1, 1, 1, 2, 4, 8, 16, 32, 64, ...
 * This generator can be used in combination with the `retry` function to perform
 * retries with exponential backoff and capped at 64 seconds between attempts.
 *
 * @returns A generator that yields the next backoff value in seconds as an integer.
 */
function* backoffGenerator() {
    const v = [1, 1, 1, 2, 4, 8, 16, 32, 64];
    let i = 0;
    while (true) {
        yield v[Math.min(i++, v.length - 1)];
    }
}
/**
 * Generates a backoff sequence based on the array of retry intervals to use with the `retry` function.
 * @param retries - Intervals to retry (in seconds).
 * @returns A generator sequence.
 */
function* makeBackoff(retries) {
    for (const retry of retries) {
        yield retry;
    }
}
/**
 * Retry a given asynchronous function with a specific backoff strategy, until it succeeds or backoff generator ends.
 * It logs the error and retry interval in case an error is caught. The function can be named for better log output.
 *
 * @param fn - The asynchronous function to be retried.
 * @param backoff - The optional backoff generator providing the intervals in seconds between retries. Defaults to a predefined series.
 * @returns A Promise that resolves with the successful result of the provided function, or rejects if backoff generator ends.
 * @throws If `NoRetryError` is thrown by the `fn`, it is rethrown.
 */
async function retry(fn, backoff = backoffGenerator()) {
    while (true) {
        try {
            return await fn();
        }
        catch (err) {
            const s = backoff.next().value;
            if (s === undefined) {
                throw err;
            }
            await new Promise(resolve => setTimeout(resolve, s * 1000));
            continue;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmV0cnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSw0Q0FNQztBQU9ELGtDQUlDO0FBV0Qsc0JBYUM7QUFqREQ7Ozs7Ozs7R0FPRztBQUNILFFBQWUsQ0FBQyxDQUFDLGdCQUFnQjtJQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFFBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFpQjtJQUM1QyxLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzVCLE1BQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNJLEtBQUssVUFBVSxLQUFLLENBQVMsRUFBeUIsRUFBRSxPQUFPLEdBQUcsZ0JBQWdCLEVBQUU7SUFDekYsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQztZQUNILE9BQU8sTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBQUMsT0FBTyxHQUFRLEVBQUUsQ0FBQztZQUNsQixNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO2dCQUNwQixNQUFNLEdBQUcsQ0FBQztZQUNaLENBQUM7WUFDRCxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1RCxTQUFTO1FBQ1gsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDIn0=