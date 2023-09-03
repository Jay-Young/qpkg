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
exports.formatLogName = exports.assignSeverityToEntries = exports.snakecaseKeys = exports.Severity = void 0;
/**
 * Common construct and functions used by both Log and LogSync
 */
const entry_1 = require("../entry");
const extend = require("extend");
const arrify = require("arrify");
var Severity;
(function (Severity) {
    Severity[Severity["emergency"] = 0] = "emergency";
    Severity[Severity["alert"] = 1] = "alert";
    Severity[Severity["critical"] = 2] = "critical";
    Severity[Severity["error"] = 3] = "error";
    Severity[Severity["warning"] = 4] = "warning";
    Severity[Severity["notice"] = 5] = "notice";
    Severity[Severity["info"] = 6] = "info";
    Severity[Severity["debug"] = 7] = "debug";
})(Severity = exports.Severity || (exports.Severity = {}));
/**
 * snakecaseKeys turns label keys from camel case to snake case.
 * @param labels
 */
function snakecaseKeys(labels) {
    for (const key in labels) {
        const replaced = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        Object.defineProperty(labels, replaced, Object.getOwnPropertyDescriptor(labels, key));
        if (replaced !== key) {
            delete labels[key];
        }
    }
    return labels;
}
exports.snakecaseKeys = snakecaseKeys;
/**
 * Return an array of log entries with the desired severity assigned.
 *
 * @private
 *
 * @param {object|object[]} entries - Log entries.
 * @param {string} severity - The desired severity level.
 */
function assignSeverityToEntries(entries, severity) {
    return arrify(entries).map(entry => {
        const metadata = extend(true, {}, entry.metadata, {
            severity,
        });
        return extend(new entry_1.Entry(), entry, {
            metadata,
        });
    });
}
exports.assignSeverityToEntries = assignSeverityToEntries;
/**
 * Format the name of a log. A log's full name is in the format of
 * 'projects/{projectId}/logs/{logName}'.
 *
 * @param projectId
 * @param name
 */
function formatLogName(projectId, name) {
    const path = 'projects/' + projectId + '/logs/';
    name = name.replace(path, '');
    if (decodeURIComponent(name) === name) {
        // The name has not been encoded yet.
        name = encodeURIComponent(name);
    }
    return path + name;
}
exports.formatLogName = formatLogName;
//# sourceMappingURL=log-common.js.map