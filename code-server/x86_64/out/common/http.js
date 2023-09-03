"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieKeys = exports.HttpError = exports.HttpCode = void 0;
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["Ok"] = 200] = "Ok";
    HttpCode[HttpCode["Redirect"] = 302] = "Redirect";
    HttpCode[HttpCode["NotFound"] = 404] = "NotFound";
    HttpCode[HttpCode["BadRequest"] = 400] = "BadRequest";
    HttpCode[HttpCode["Unauthorized"] = 401] = "Unauthorized";
    HttpCode[HttpCode["Forbidden"] = 403] = "Forbidden";
    HttpCode[HttpCode["LargePayload"] = 413] = "LargePayload";
    HttpCode[HttpCode["ServerError"] = 500] = "ServerError";
})(HttpCode || (exports.HttpCode = HttpCode = {}));
/**
 * Represents an error with a message and an HTTP status code. This code will be
 * used in the HTTP response.
 */
class HttpError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = this.constructor.name;
    }
}
exports.HttpError = HttpError;
var CookieKeys;
(function (CookieKeys) {
    CookieKeys["Session"] = "code-server-session";
})(CookieKeys || (exports.CookieKeys = CookieKeys = {}));
//# sourceMappingURL=http.js.map