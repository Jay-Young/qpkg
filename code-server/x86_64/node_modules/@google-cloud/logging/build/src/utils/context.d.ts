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
/// <reference types="node" />
import * as http from 'http';
/** Header that carries span context across Google infrastructure. */
export declare const X_CLOUD_TRACE_HEADER = "x-cloud-trace-context";
/** Header that carries span context across W3C compliant infrastructure. */
export declare const W3C_TRACE_PARENT_HEADER = "traceparent";
/**
 * An transport and environment neutral API for getting request headers.
 */
export interface HeaderWrapper {
    getHeader(name: string): string | string[] | undefined;
    setHeader(name: string, value: string): void;
}
/**
 * makeHeaderWrapper returns a wrapper with set and get header functionality,
 * returning null if the incoming request object doesn't contain the 'header'
 * propery.
 * @param req
 */
export declare function makeHeaderWrapper(req: http.IncomingMessage): HeaderWrapper | null;
/**
 * CloudTraceContext: Cloud Logging compliant trace context.
 */
export interface CloudTraceContext {
    trace: string;
    spanId?: string;
    traceSampled?: boolean;
}
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
export declare function getOrInjectContext(req: http.IncomingMessage, projectId: string, inject?: boolean): CloudTraceContext;
/**
 * getContextFromXCloudTrace looks for the HTTP header 'x-cloud-trace-context'
 * per Google Cloud specifications for Cloud Tracing.
 *
 * @param headerWrapper
 * @param projectId
 */
export declare function getContextFromXCloudTrace(headerWrapper: HeaderWrapper, projectId: string): CloudTraceContext | null;
/**
 * getOrInjectTraceParent looks for the HTTP header 'traceparent'
 * per W3C specifications for OpenTelemetry and OpenCensus
 * Read more about W3C protocol: https://www.w3.org/TR/trace-context/
 *
 * @param headerWrapper
 * @param projectId
 */
export declare function getContextFromTraceParent(headerWrapper: HeaderWrapper, projectId: string): CloudTraceContext | null;
/**
 * parseXCloudTraceHeader looks for trace context in `X-Cloud-Trace-Context`
 * header
 * @param headerWrapper
 */
export declare function parseXCloudTraceHeader(headerWrapper: HeaderWrapper): CloudTraceContext | null;
/**
 * parseTraceParentHeader is a custom implementation of the `parseTraceParent`
 * function in @opentelemetry-core/trace.
 * For more information see {@link https://www.w3.org/TR/trace-context/}
 * @param headerWrapper
 */
export declare function parseTraceParentHeader(headerWrapper: HeaderWrapper): CloudTraceContext | null;
