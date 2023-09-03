"use strict";
/*!
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTraceParentHeader = exports.parseXCloudTraceHeader = exports.getContextFromTraceParent = exports.getContextFromXCloudTrace = exports.getOrInjectContext = exports.makeHeaderWrapper = exports.W3C_TRACE_PARENT_HEADER = exports.X_CLOUD_TRACE_HEADER = void 0;
const uuid = require("uuid");
const crypto = require("crypto");
/** Header that carries span context across Google infrastructure. */
exports.X_CLOUD_TRACE_HEADER = 'x-cloud-trace-context';
const SPAN_ID_RANDOM_BYTES = 8;
const spanIdBuffer = Buffer.alloc(SPAN_ID_RANDOM_BYTES);
const randomFillSync = crypto.randomFillSync;
const randomBytes = crypto.randomBytes;
const spanRandomBuffer = randomFillSync
    ? () => randomFillSync(spanIdBuffer)
    : () => randomBytes(SPAN_ID_RANDOM_BYTES);
/** Header that carries span context across W3C compliant infrastructure. */
exports.W3C_TRACE_PARENT_HEADER = 'traceparent';
/**
 * makeHeaderWrapper returns a wrapper with set and get header functionality,
 * returning null if the incoming request object doesn't contain the 'header'
 * propery.
 * @param req
 */
function makeHeaderWrapper(req) {
    if (!req.headers)
        return null;
    const wrapper = {
        setHeader(name, value) {
            req.headers[name] = value;
        },
        getHeader(name) {
            return req.headers[name];
        },
    };
    return wrapper;
}
exports.makeHeaderWrapper = makeHeaderWrapper;
/**
 * getOrInjectContext returns a CloudTraceContext with as many available trace
 * and span properties as possible. It examines HTTP headers for trace context.
 * Optionally, it can inject a Google compliant trace context when no context is
 * available from headers.
 *
 * @param req
 * @param projectId
 * @param inject
 */
function getOrInjectContext(req, projectId, inject) {
    const defaultContext = toCloudTraceContext({}, projectId);
    const wrapper = makeHeaderWrapper(req);
    if (wrapper) {
        // Detect 'traceparent' header.
        const traceContext = getContextFromTraceParent(wrapper, projectId);
        if (traceContext)
            return traceContext;
        // Detect 'X-Cloud-Trace-Context' header.
        const cloudContext = getContextFromXCloudTrace(wrapper, projectId);
        if (cloudContext)
            return cloudContext;
        // Optional: Generate and inject a context for the user as last resort.
        if (inject) {
            wrapper.setHeader(exports.X_CLOUD_TRACE_HEADER, makeCloudTraceHeader());
            return getContextFromXCloudTrace(wrapper, projectId);
        }
    }
    return defaultContext;
}
exports.getOrInjectContext = getOrInjectContext;
/**
 * toCloudTraceContext converts any context format to cloudTraceContext format.
 * @param context
 * @param projectId
 */
function toCloudTraceContext(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
anyContext, projectId) {
    const context = {
        trace: '',
    };
    if (anyContext === null || anyContext === void 0 ? void 0 : anyContext.trace) {
        context.trace = `projects/${projectId}/traces/${anyContext.trace}`;
    }
    if (anyContext === null || anyContext === void 0 ? void 0 : anyContext.spanId) {
        context.spanId = anyContext.spanId;
    }
    if ('traceSampled' in anyContext) {
        context.traceSampled = anyContext.traceSampled;
    }
    return context;
}
/**
 * makeCloudTraceHeader generates valid X-Cloud-Trace-Context trace and spanId.
 */
function makeCloudTraceHeader() {
    const trace = uuid.v4().replace(/-/g, '');
    const spanId = spanRandomBuffer().toString('hex');
    return `${trace}/${spanId}`;
}
/**
 * getContextFromXCloudTrace looks for the HTTP header 'x-cloud-trace-context'
 * per Google Cloud specifications for Cloud Tracing.
 *
 * @param headerWrapper
 * @param projectId
 */
function getContextFromXCloudTrace(headerWrapper, projectId) {
    const context = parseXCloudTraceHeader(headerWrapper);
    if (!context)
        return null;
    return toCloudTraceContext(context, projectId);
}
exports.getContextFromXCloudTrace = getContextFromXCloudTrace;
/**
 * getOrInjectTraceParent looks for the HTTP header 'traceparent'
 * per W3C specifications for OpenTelemetry and OpenCensus
 * Read more about W3C protocol: https://www.w3.org/TR/trace-context/
 *
 * @param headerWrapper
 * @param projectId
 */
function getContextFromTraceParent(headerWrapper, projectId) {
    const context = parseTraceParentHeader(headerWrapper);
    if (!context)
        return null;
    return toCloudTraceContext(context, projectId);
}
exports.getContextFromTraceParent = getContextFromTraceParent;
/**
 * parseXCloudTraceHeader looks for trace context in `X-Cloud-Trace-Context`
 * header
 * @param headerWrapper
 */
function parseXCloudTraceHeader(headerWrapper) {
    var _a;
    const regex = /([a-f\d]+)?(\/?([a-f\d]+))?(;?o=(\d))?/;
    const match = (_a = headerWrapper
        .getHeader(exports.X_CLOUD_TRACE_HEADER)) === null || _a === void 0 ? void 0 : _a.toString().match(regex);
    if (!match)
        return null;
    return {
        trace: match[1],
        spanId: match[3],
        traceSampled: match[5] === '1',
    };
}
exports.parseXCloudTraceHeader = parseXCloudTraceHeader;
/**
 * parseTraceParentHeader is a custom implementation of the `parseTraceParent`
 * function in @opentelemetry-core/trace.
 * For more information see {@link https://www.w3.org/TR/trace-context/}
 * @param headerWrapper
 */
function parseTraceParentHeader(headerWrapper) {
    var _a;
    const VERSION_PART = '(?!ff)[\\da-f]{2}';
    const TRACE_ID_PART = '(?![0]{32})[\\da-f]{32}';
    const PARENT_ID_PART = '(?![0]{16})[\\da-f]{16}';
    const FLAGS_PART = '[\\da-f]{2}';
    const TRACE_PARENT_REGEX = new RegExp(`^\\s?(${VERSION_PART})-(${TRACE_ID_PART})-(${PARENT_ID_PART})-(${FLAGS_PART})(-.*)?\\s?$`);
    const match = (_a = headerWrapper
        .getHeader(exports.W3C_TRACE_PARENT_HEADER)) === null || _a === void 0 ? void 0 : _a.toString().match(TRACE_PARENT_REGEX);
    if (!match)
        return null;
    // According to the specification the implementation should be compatible
    // with future versions. If there are more parts, we only reject it if it's using version 00
    // See https://www.w3.org/TR/trace-context/#versioning-of-traceparent
    if (match[1] === '00' && match[5])
        return null;
    return {
        trace: match[2],
        spanId: match[3],
        traceSampled: (parseInt(match[4], 16) & 1) === 1,
    };
}
exports.parseTraceParentHeader = parseTraceParentHeader;
//# sourceMappingURL=context.js.map