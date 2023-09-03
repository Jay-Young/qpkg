"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHost = exports.authenticateOrigin = exports.ensureOrigin = exports.self = exports.getCookieOptions = exports.disposer = exports.getCookieDomain = exports.redirect = exports.constructRedirectPath = exports.relativeRoot = exports.authenticated = exports.ensureAuthenticated = exports.proxyEnabled = exports.ensureProxyEnabled = exports.replaceTemplates = exports.createClientConfiguration = void 0;
const logger_1 = require("@coder/logger");
const qs = __importStar(require("qs"));
const http_1 = require("../common/http");
const util_1 = require("../common/util");
const cli_1 = require("./cli");
const constants_1 = require("./constants");
const util_2 = require("./util");
const createClientConfiguration = (req) => {
    const base = (0, exports.relativeRoot)(req.originalUrl);
    return {
        base,
        csStaticBase: base + "/_static",
        codeServerVersion: constants_1.version,
    };
};
exports.createClientConfiguration = createClientConfiguration;
/**
 * Replace common variable strings in HTML templates.
 */
const replaceTemplates = (req, content, extraOpts) => {
    const serverOptions = Object.assign(Object.assign({}, (0, exports.createClientConfiguration)(req)), extraOpts);
    return content
        .replace(/{{TO}}/g, (typeof req.query.to === "string" && (0, util_2.escapeHtml)(req.query.to)) || "/")
        .replace(/{{BASE}}/g, serverOptions.base)
        .replace(/{{CS_STATIC_BASE}}/g, serverOptions.csStaticBase)
        .replace("{{OPTIONS}}", () => (0, util_2.escapeJSON)(serverOptions));
};
exports.replaceTemplates = replaceTemplates;
/**
 * Throw an error if proxy is not enabled. Call `next` if provided.
 */
const ensureProxyEnabled = (req, _, next) => {
    if (!(0, exports.proxyEnabled)(req)) {
        throw new http_1.HttpError("Forbidden", http_1.HttpCode.Forbidden);
    }
    if (next) {
        next();
    }
};
exports.ensureProxyEnabled = ensureProxyEnabled;
/**
 * Return true if proxy is enabled.
 */
const proxyEnabled = (req) => {
    return !req.args["disable-proxy"];
};
exports.proxyEnabled = proxyEnabled;
/**
 * Throw an error if not authorized. Call `next` if provided.
 */
const ensureAuthenticated = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isAuthenticated = yield (0, exports.authenticated)(req);
    if (!isAuthenticated) {
        throw new http_1.HttpError("Unauthorized", http_1.HttpCode.Unauthorized);
    }
    if (next) {
        next();
    }
});
exports.ensureAuthenticated = ensureAuthenticated;
/**
 * Return true if authenticated via cookies.
 */
const authenticated = (req) => __awaiter(void 0, void 0, void 0, function* () {
    switch (req.args.auth) {
        case cli_1.AuthType.None: {
            return true;
        }
        case cli_1.AuthType.Password: {
            // The password is stored in the cookie after being hashed.
            const hashedPasswordFromArgs = req.args["hashed-password"];
            const passwordMethod = (0, util_2.getPasswordMethod)(hashedPasswordFromArgs);
            const isCookieValidArgs = {
                passwordMethod,
                cookieKey: (0, util_2.sanitizeString)(req.cookies[http_1.CookieKeys.Session]),
                passwordFromArgs: req.args.password || "",
                hashedPasswordFromArgs: req.args["hashed-password"],
            };
            return yield (0, util_2.isCookieValid)(isCookieValidArgs);
        }
        default: {
            throw new Error(`Unsupported auth type ${req.args.auth}`);
        }
    }
});
exports.authenticated = authenticated;
/**
 * Get the relative path that will get us to the root of the page. For each
 * slash we need to go up a directory.  Will not have a trailing slash.
 *
 * For example:
 *
 * / => .
 * /foo => .
 * /foo/ => ./..
 * /foo/bar => ./..
 * /foo/bar/ => ./../..
 *
 * All paths must be relative in order to work behind a reverse proxy since we
 * we do not know the base path.  Anything that needs to be absolute (for
 * example cookies) must get the base path from the frontend.
 *
 * All relative paths must be prefixed with the relative root to ensure they
 * work no matter the depth at which they happen to appear.
 *
 * For Express `req.originalUrl` should be used as they remove the base from the
 * standard `url` property making it impossible to get the true depth.
 */
const relativeRoot = (originalUrl) => {
    const depth = (originalUrl.split("?", 1)[0].match(/\//g) || []).length;
    return (0, util_1.normalize)("./" + (depth > 1 ? "../".repeat(depth - 1) : ""));
};
exports.relativeRoot = relativeRoot;
/**
 * A helper function to construct a redirect path based on
 * an Express Request, query and a path to redirect to.
 *
 * Redirect path is relative to `/${to}`.
 */
const constructRedirectPath = (req, query, to) => {
    const relativePath = (0, util_1.normalize)(`${(0, exports.relativeRoot)(req.originalUrl)}/${to}`, true);
    // %2f or %2F are both equalivent to an encoded slash /
    const queryString = qs.stringify(query).replace(/%2[fF]/g, "/");
    const redirectPath = `${relativePath}${queryString ? `?${queryString}` : ""}`;
    return redirectPath;
};
exports.constructRedirectPath = constructRedirectPath;
/**
 * Redirect relatively to `/${to}`. Query variables on the current URI will be
 * preserved.  `to` should be a simple path without any query parameters
 * `override` will merge with the existing query (use `undefined` to unset).
 */
const redirect = (req, res, to, override = {}) => {
    const query = Object.assign({}, req.query, override);
    Object.keys(override).forEach((key) => {
        if (typeof override[key] === "undefined") {
            delete query[key];
        }
    });
    const redirectPath = (0, exports.constructRedirectPath)(req, query, to);
    logger_1.logger.debug(`redirecting from ${req.originalUrl} to ${redirectPath}`);
    res.redirect(redirectPath);
};
exports.redirect = redirect;
/**
 * Get the value that should be used for setting a cookie domain. This will
 * allow the user to authenticate once no matter what sub-domain they use to log
 * in. This will use the highest level proxy domain (e.g. `coder.com` over
 * `test.coder.com` if both are specified).
 */
const getCookieDomain = (host, proxyDomains) => {
    const idx = host.lastIndexOf(":");
    host = idx !== -1 ? host.substring(0, idx) : host;
    // If any of these are true we will still set cookies but without an explicit
    // `Domain` attribute on the cookie.
    if (
    // The host can be be blank or missing so there's nothing we can set.
    !host ||
        // IP addresses can't have subdomains so there's no value in setting the
        // domain for them. Assume that anything with a : is ipv6 (valid domain name
        // characters are alphanumeric or dashes)...
        host.includes(":") ||
        // ...and that anything entirely numbers and dots is ipv4 (currently tlds
        // cannot be entirely numbers).
        !/[^0-9.]/.test(host) ||
        // localhost subdomains don't seem to work at all (browser bug?). A cookie
        // set at dev.localhost cannot be read by 8080.dev.localhost.
        host.endsWith(".localhost") ||
        // Domains without at least one dot (technically two since domain.tld will
        // become .domain.tld) are considered invalid according to the spec so don't
        // set the domain for them. In my testing though localhost is the only
        // problem (the browser just doesn't store the cookie at all). localhost has
        // an additional problem which is that a reverse proxy might give
        // code-server localhost even though the domain is really domain.tld (by
        // default NGINX does this).
        !host.includes(".")) {
        logger_1.logger.debug("no valid cookie domain", (0, logger_1.field)("host", host));
        return undefined;
    }
    proxyDomains.forEach((domain) => {
        if (host.endsWith(domain) && domain.length < host.length) {
            host = domain;
        }
    });
    logger_1.logger.debug("got cookie domain", (0, logger_1.field)("host", host));
    return host || undefined;
};
exports.getCookieDomain = getCookieDomain;
/**
 * Return a function capable of fully disposing an HTTP server.
 */
function disposer(server) {
    const sockets = new Set();
    let cleanupTimeout;
    server.on("connection", (socket) => {
        sockets.add(socket);
        socket.on("close", () => {
            sockets.delete(socket);
            if (cleanupTimeout && sockets.size === 0) {
                clearTimeout(cleanupTimeout);
                cleanupTimeout = undefined;
            }
        });
    });
    return () => {
        return new Promise((resolve, reject) => {
            // The whole reason we need this disposer is because close will not
            // actually close anything; it only prevents future connections then waits
            // until everything is closed.
            server.close((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
            // If there are sockets remaining we might need to force close them or
            // this promise might never resolve.
            if (sockets.size > 0) {
                // Give sockets a chance to close up shop.
                cleanupTimeout = setTimeout(() => {
                    cleanupTimeout = undefined;
                    for (const socket of sockets.values()) {
                        console.warn("a socket was left hanging");
                        socket.destroy();
                    }
                }, 1000);
            }
        });
    };
}
exports.disposer = disposer;
/**
 * Get the options for setting a cookie.  The options must be identical for
 * setting and unsetting cookies otherwise they are considered separate.
 */
const getCookieOptions = (req) => {
    // Normally we set paths relatively.  However browsers do not appear to allow
    // cookies to be set relatively which means we need an absolute path.  We
    // cannot be guaranteed we know the path since a reverse proxy might have
    // rewritten it.  That means we need to get the path from the frontend.
    // The reason we need to set the path (as opposed to defaulting to /) is to
    // avoid code-server instances on different sub-paths clobbering each other or
    // from accessing each other's tokens (and to prevent other services from
    // accessing code-server's tokens).
    // When logging in or out the request must include the href (the full current
    // URL of that page) and the relative path to the root as given to it by the
    // backend.  Using these two we can determine the true absolute root.
    const url = new URL(req.query.base || req.body.base || "/", req.query.href || req.body.href || "http://" + (req.headers.host || "localhost"));
    return {
        domain: (0, exports.getCookieDomain)(url.host, req.args["proxy-domain"]),
        path: (0, util_1.normalize)(url.pathname) || "/",
        sameSite: "lax",
    };
};
exports.getCookieOptions = getCookieOptions;
/**
 * Return the full path to the current page, preserving any trailing slash.
 */
const self = (req) => {
    return (0, util_1.normalize)(`${req.baseUrl}${req.originalUrl.endsWith("/") ? "/" : ""}`, true);
};
exports.self = self;
function getFirstHeader(req, headerName) {
    const val = req.headers[headerName];
    return Array.isArray(val) ? val[0] : val;
}
/**
 * Throw a forbidden error if origin checks fail. Call `next` if provided.
 */
function ensureOrigin(req, _, next) {
    try {
        authenticateOrigin(req);
        if (next) {
            next();
        }
    }
    catch (error) {
        logger_1.logger.debug(`${error instanceof Error ? error.message : error}; blocking request to ${req.originalUrl}`);
        throw new http_1.HttpError("Forbidden", http_1.HttpCode.Forbidden);
    }
}
exports.ensureOrigin = ensureOrigin;
/**
 * Authenticate the request origin against the host.  Throw if invalid.
 */
function authenticateOrigin(req) {
    // A missing origin probably means the source is non-browser.  Not sure we
    // have a use case for this but let it through.
    const originRaw = getFirstHeader(req, "origin");
    if (!originRaw) {
        return;
    }
    let origin;
    try {
        origin = new URL(originRaw).host.trim().toLowerCase();
    }
    catch (error) {
        throw new Error(`unable to parse malformed origin "${originRaw}"`);
    }
    const trustedOrigins = req.args["trusted-origins"] || [];
    if (trustedOrigins.includes(origin) || trustedOrigins.includes("*")) {
        return;
    }
    const host = getHost(req);
    if (typeof host === "undefined") {
        // A missing host likely means the reverse proxy has not been configured to
        // forward the host which means we cannot perform the check.  Emit an error
        // so an admin can fix the issue.
        logger_1.logger.error("No host headers found");
        logger_1.logger.error("Are you behind a reverse proxy that does not forward the host?");
        throw new Error("no host headers found");
    }
    if (host !== origin) {
        throw new Error(`host "${host}" does not match origin "${origin}"`);
    }
}
exports.authenticateOrigin = authenticateOrigin;
/**
 * Get the host from headers.  It will be trimmed and lowercased.
 */
function getHost(req) {
    // Honor Forwarded if present.
    const forwardedRaw = getFirstHeader(req, "forwarded");
    if (forwardedRaw) {
        const parts = forwardedRaw.split(/[;,]/);
        for (let i = 0; i < parts.length; ++i) {
            const [key, value] = (0, util_2.splitOnFirstEquals)(parts[i]);
            if (key.trim().toLowerCase() === "host" && value) {
                return value.trim().toLowerCase();
            }
        }
    }
    // Honor X-Forwarded-Host if present.  Some reverse proxies will set multiple
    // comma-separated hosts.
    const xHost = getFirstHeader(req, "x-forwarded-host");
    if (xHost) {
        const firstXHost = xHost.split(",")[0];
        if (firstXHost) {
            return firstXHost.trim().toLowerCase();
        }
    }
    const host = getFirstHeader(req, "host");
    return host ? host.trim().toLowerCase() : undefined;
}
exports.getHost = getHost;
//# sourceMappingURL=http.js.map