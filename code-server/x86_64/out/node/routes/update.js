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
const constants_1 = require("../constants");
const http_1 = require("../http");
exports.router = (0, express_1.Router)();
exports.router.get("/check", http_1.ensureAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield req.updater.getUpdate(req.query.force === "true");
    res.json({
        checked: update.checked,
        latest: update.version,
        current: constants_1.version,
        isLatest: req.updater.isLatestVersion(update),
    });
}));
//# sourceMappingURL=update.js.map