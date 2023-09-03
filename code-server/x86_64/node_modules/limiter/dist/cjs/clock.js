"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = exports.getMilliseconds = void 0;
const just_performance_1 = require("just-performance");
// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp) {
    const clocktime = just_performance_1.performance.now() * 1e-3;
    let seconds = Math.floor(clocktime);
    let nanoseconds = Math.floor((clocktime % 1) * 1e9);
    if (previousTimestamp != undefined) {
        seconds = seconds - previousTimestamp[0];
        nanoseconds = nanoseconds - previousTimestamp[1];
        if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
        }
    }
    return [seconds, nanoseconds];
}
// The current timestamp in whole milliseconds
function getMilliseconds() {
    const [seconds, nanoseconds] = hrtime();
    return seconds * 1e3 + Math.floor(nanoseconds / 1e6);
}
exports.getMilliseconds = getMilliseconds;
// Wait for a specified number of milliseconds before fulfilling the returned promise.
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.wait = wait;
//# sourceMappingURL=clock.js.map