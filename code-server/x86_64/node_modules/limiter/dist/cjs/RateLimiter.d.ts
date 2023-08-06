import { Interval, TokenBucket } from "./TokenBucket";
export declare type RateLimiterOpts = {
    tokensPerInterval: number;
    interval: Interval;
    fireImmediately?: boolean;
};
/**
 * A generic rate limiter. Underneath the hood, this uses a token bucket plus
 * an additional check to limit how many tokens we can remove each interval.
 *
 * @param options
 * @param options.tokensPerInterval Maximum number of tokens that can be
 *  removed at any given moment and over the course of one interval.
 * @param options.interval The interval length in milliseconds, or as
 *  one of the following strings: 'second', 'minute', 'hour', day'.
 * @param options.fireImmediately Whether or not the promise will resolve
 *  immediately when rate limiting is in effect (default is false).
 */
export declare class RateLimiter {
    tokenBucket: TokenBucket;
    curIntervalStart: number;
    tokensThisInterval: number;
    fireImmediately: boolean;
    constructor({ tokensPerInterval, interval, fireImmediately }: RateLimiterOpts);
    /**
     * Remove the requested number of tokens. If the rate limiter contains enough
     * tokens and we haven't spent too many tokens in this interval already, this
     * will happen immediately. Otherwise, the removal will happen when enough
     * tokens become available.
     * @param count The number of tokens to remove.
     * @returns A promise for the remainingTokens count.
     */
    removeTokens(count: number): Promise<number>;
    /**
     * Attempt to remove the requested number of tokens and return immediately.
     * If the bucket (and any parent buckets) contains enough tokens and we
     * haven't spent too many tokens in this interval already, this will return
     * true. Otherwise, false is returned.
     * @param {Number} count The number of tokens to remove.
     * @param {Boolean} True if the tokens were successfully removed, otherwise
     *  false.
     */
    tryRemoveTokens(count: number): boolean;
    /**
     * Returns the number of tokens remaining in the TokenBucket.
     * @returns {Number} The number of tokens remaining.
     */
    getTokensRemaining(): number;
}
//# sourceMappingURL=RateLimiter.d.ts.map