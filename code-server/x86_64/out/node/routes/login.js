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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.RateLimiter = void 0;
const express_1 = require("express");
const fs_1 = require("fs");
const limiter_1 = require("limiter");
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const http_1 = require("../../common/http");
const constants_1 = require("../constants");
const http_2 = require("../http");
const util_1 = require("../util");
const i18n_1 = __importDefault(require("../i18n"));
// RateLimiter wraps around the limiter library for logins.
// It allows 2 logins every minute plus 12 logins every hour.
class RateLimiter {
    constructor() {
        this.minuteLimiter = new limiter_1.RateLimiter({ tokensPerInterval: 2, interval: "minute" });
        this.hourLimiter = new limiter_1.RateLimiter({ tokensPerInterval: 12, interval: "hour" });
    }
    canTry() {
        // Note: we must check using >= 1 because technically when there are no tokens left
        // you get back a number like 0.00013333333333333334
        // which would cause fail if the logic were > 0
        return this.minuteLimiter.getTokensRemaining() >= 1 || this.hourLimiter.getTokensRemaining() >= 1;
    }
    removeToken() {
        return this.minuteLimiter.tryRemoveTokens(1) || this.hourLimiter.tryRemoveTokens(1);
    }
}
exports.RateLimiter = RateLimiter;
const getRoot = (req, error) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield fs_1.promises.readFile(path.join(constants_1.rootPath, "src/browser/pages/login.html"), "utf8");
    const locale = req.args["locale"] || "en";
    i18n_1.default.changeLanguage(locale);
    const appName = req.args["app-name"] || "code-server";
    const welcomeText = req.args["welcome-text"] || i18n_1.default.t("WELCOME", { app: appName });
    let passwordMsg = i18n_1.default.t("LOGIN_PASSWORD", { configFile: (0, util_1.humanPath)(os.homedir(), req.args.config) });
    if (req.args.usingEnvPassword) {
        passwordMsg = i18n_1.default.t("LOGIN_USING_ENV_PASSWORD");
    }
    else if (req.args.usingEnvHashedPassword) {
        passwordMsg = i18n_1.default.t("LOGIN_USING_HASHED_PASSWORD");
    }
    return (0, http_2.replaceTemplates)(req, content
        .replace(/{{I18N_LOGIN_TITLE}}/g, i18n_1.default.t("LOGIN_TITLE", { app: appName }))
        .replace(/{{WELCOME_TEXT}}/g, welcomeText)
        .replace(/{{PASSWORD_MSG}}/g, passwordMsg)
        .replace(/{{I18N_LOGIN_BELOW}}/g, i18n_1.default.t("LOGIN_BELOW"))
        .replace(/{{I18N_PASSWORD_PLACEHOLDER}}/g, i18n_1.default.t("PASSWORD_PLACEHOLDER"))
        .replace(/{{I18N_SUBMIT}}/g, i18n_1.default.t("SUBMIT"))
        .replace(/{{ERROR}}/, error ? `<div class="error">${(0, util_1.escapeHtml)(error.message)}</div>` : ""));
});
const limiter = new RateLimiter();
exports.router = (0, express_1.Router)();
exports.router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const to = (typeof req.query.to === "string" && req.query.to) || "/";
    if (yield (0, http_2.authenticated)(req)) {
        return (0, http_2.redirect)(req, res, to, { to: undefined });
    }
    next();
}));
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield getRoot(req));
}));
exports.router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = (0, util_1.sanitizeString)(req.body.password);
    const hashedPasswordFromArgs = req.args["hashed-password"];
    try {
        // Check to see if they exceeded their login attempts
        if (!limiter.canTry()) {
            throw new Error(i18n_1.default.t("LOGIN_RATE_LIMIT"));
        }
        if (!password) {
            throw new Error(i18n_1.default.t("MISS_PASSWORD"));
        }
        const passwordMethod = (0, util_1.getPasswordMethod)(hashedPasswordFromArgs);
        const { isPasswordValid, hashedPassword } = yield (0, util_1.handlePasswordValidation)({
            passwordMethod,
            hashedPasswordFromArgs,
            passwordFromRequestBody: password,
            passwordFromArgs: req.args.password,
        });
        if (isPasswordValid) {
            // The hash does not add any actual security but we do it for
            // obfuscation purposes (and as a side effect it handles escaping).
            res.cookie(http_1.CookieKeys.Session, hashedPassword, (0, http_2.getCookieOptions)(req));
            const to = (typeof req.query.to === "string" && req.query.to) || "/";
            return (0, http_2.redirect)(req, res, to, { to: undefined });
        }
        // Note: successful logins should not count against the RateLimiter
        // which is why this logic must come after the successful login logic
        limiter.removeToken();
        console.error("Failed login attempt", JSON.stringify({
            xForwardedFor: req.headers["x-forwarded-for"],
            remoteAddress: req.connection.remoteAddress,
            userAgent: req.headers["user-agent"],
            timestamp: Math.floor(new Date().getTime() / 1000),
        }));
        throw new Error(i18n_1.default.t("INCORRECT_PASSWORD"));
    }
    catch (error) {
        const renderedHtml = yield getRoot(req, error);
        res.send(renderedHtml);
    }
}));
//# sourceMappingURL=login.js.map