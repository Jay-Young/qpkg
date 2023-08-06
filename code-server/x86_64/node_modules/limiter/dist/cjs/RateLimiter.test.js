"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RateLimiter_1 = require("./RateLimiter");
describe("RateLimiter", () => {
    describe("interval validation", () => {
        it("invalid interval", () => {
            const junkInterval = "junk";
            expect(() => new RateLimiter_1.RateLimiter({ tokensPerInterval: 1, interval: junkInterval })).toThrow();
        });
        it("valid intervals", () => {
            expect(() => new RateLimiter_1.RateLimiter({ tokensPerInterval: 1, interval: "sec" })).not.toThrow();
            expect(() => new RateLimiter_1.RateLimiter({ tokensPerInterval: 1, interval: "second" })).not.toThrow();
            expect(() => new RateLimiter_1.RateLimiter({ tokensPerInterval: 1, interval: "min" })).not.toThrow();
            expect(() => new RateLimiter_1.RateLimiter({ tokensPerInterval: 1, interval: "minute" })).not.toThrow();
            expect(() => new RateLimiter_1.RateLimiter({ tokensPerInterval: 1, interval: "hr" })).not.toThrow();
            expect(() => new RateLimiter_1.RateLimiter({ tokensPerInterval: 1, interval: "hour" })).not.toThrow();
            expect(() => new RateLimiter_1.RateLimiter({ tokensPerInterval: 1, interval: "day" })).not.toThrow();
        });
    });
});
//# sourceMappingURL=RateLimiter.test.js.map