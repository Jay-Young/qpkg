"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsErrorHandler = exports.errorHandler = exports.errorHasCode = exports.errorHasStatusCode = void 0;
const logger_1 = require("@coder/logger");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const http_1 = require("../../common/http");
const constants_1 = require("../constants");
const http_2 = require("../http");
const util_1 = require("../util");
/** Error is network related. */
const errorHasStatusCode = (error) => {
    return error && "statusCode" in error;
};
exports.errorHasStatusCode = errorHasStatusCode;
/** Error originates from file system. */
const errorHasCode = (error) => {
    return error && "code" in error;
};
exports.errorHasCode = errorHasCode;
const notFoundCodes = [404, "ENOENT", "EISDIR"];
const errorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 500;
    if ((0, exports.errorHasStatusCode)(err)) {
        statusCode = err.statusCode;
    }
    else if ((0, exports.errorHasCode)(err) && notFoundCodes.includes(err.code)) {
        statusCode = http_1.HttpCode.NotFound;
    }
    res.status(statusCode);
    // Assume anything that explicitly accepts text/html is a user browsing a
    // page (as opposed to an xhr request). Don't use `req.accepts()` since
    // *every* request that I've seen (in Firefox and Chromium at least)
    // includes `*/*` making it always truthy. Even for css/javascript.
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
        const resourcePath = path_1.default.resolve(constants_1.rootPath, "src/browser/pages/error.html");
        res.set("Content-Type", (0, util_1.getMediaMime)(resourcePath));
        const content = yield fs_1.promises.readFile(resourcePath, "utf8");
        res.send((0, http_2.replaceTemplates)(req, content)
            .replace(/{{ERROR_TITLE}}/g, statusCode.toString())
            .replace(/{{ERROR_HEADER}}/g, statusCode.toString())
            .replace(/{{ERROR_BODY}}/g, (0, util_1.escapeHtml)(err.message)));
    }
    else {
        res.json(Object.assign({ error: err.message }, (err.details || {})));
    }
});
exports.errorHandler = errorHandler;
const wsErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 500;
    if ((0, exports.errorHasStatusCode)(err)) {
        statusCode = err.statusCode;
    }
    else if ((0, exports.errorHasCode)(err) && notFoundCodes.includes(err.code)) {
        statusCode = http_1.HttpCode.NotFound;
    }
    if (statusCode >= 500) {
        logger_1.logger.error(`${err.message} ${err.stack}`);
    }
    else {
        logger_1.logger.debug(`${err.message} ${err.stack}`);
    }
    ;
    req.ws.end(`HTTP/1.1 ${statusCode} ${err.message}\r\n\r\n`);
});
exports.wsErrorHandler = wsErrorHandler;
//# sourceMappingURL=errors.js.map