export declare type Interval = number | "second" | "sec" | "minute" | "min" | "hour" | "hr" | "day";
export declare type TokenBucketOpts = {
    bucketSize: number;
    tokensPerInterval: number;
    interval: Interval;
    parentBucket?: TokenBucket;
};
/**
 * A hierarchical token bucket for rate limiting. See
 * http://en.wikipedia.org/wiki/Token_bucket for more information.
 *
 * @param options
 * @param options.bucketSize Maximum number of tokens to hold in the bucket.
 *  Also known as the burst rate.
 * @param options.tokensPerInterval Number of tokens to drip into the bucket
 *  over the course of one interval.
 * @param options.interval The interval length in milliseconds, or as
 *  one of the following strings: 'second', 'minute', 'hour', day'.
 * @param options.parentBucket Optional. A token bucket that will act as
 *  the parent of this bucket.
 */
export declare class TokenBucket {
    bucketSize: number;
    tokensPerInterval: number;
    interval: number;
    parentBucket?: TokenBucket;
    content: number;
    lastDrip: number;
    constructor({ bucketSize, tokensPerInterval, interval, parentBucket }: TokenBucketOpts);
    /**
     * Remove the requested number of tokens. If the bucket (and any parent
     * buckets) contains enough tokens this will happen immediately. Otherwise,
     * the removal will happen when enough tokens become available.
     * @param count The number of tokens to remove.
     * @returns A promise for the remainingTokens count.
     */
    removeTokens(count: number): Promise<number>;
    /**
     * Attempt to remove the requested number of tokens and return immediately.
     * If the bucket (and any parent buckets) contains enough tokens this will
     * return true, otherwise false is returned.
     * @param {Number} count The number of tokens to remove.
     * @param {Boolean} True if the tokens were successfully removed, otherwise
     *  false.
     */
    tryRemoveTokens(count: number): boolean;
    /**
     * Add any new tokens to the bucket since the last drip.
     * @returns {Boolean} True if new tokens were added, otherwise false.
     */
    drip(): boolean;
}
//# sourceMappingURL=TokenBucket.d.ts.map