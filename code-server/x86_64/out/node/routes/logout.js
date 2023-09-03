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
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_1 = require("../../common/http");
const http_2 = require("../http");
const util_1 = require("../util");
exports.router = (0, express_1.Router)();
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Must use the *identical* properties used to set the cookie.
    res.clearCookie(http_1.CookieKeys.Session, (0, http_2.getCookieOptions)(req));
    const to = (0, util_1.sanitizeString)(req.query.to) || "/";
    return (0, http_2.redirect)(req, res, to, { to: undefined, base: undefined, href: undefined });
}));
//# sourceMappingURL=logout.js.map