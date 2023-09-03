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
exports.wsRouter = exports.router = void 0;
const express_1 = require("express");
const wsRouter_1 = require("../wsRouter");
exports.router = (0, express_1.Router)();
exports.router.get("/", (req, res) => {
    res.json({
        status: req.heart.alive() ? "alive" : "expired",
        lastHeartbeat: req.heart.lastHeartbeat,
    });
});
exports.wsRouter = (0, wsRouter_1.Router)();
exports.wsRouter.ws("/", (req) => __awaiter(void 0, void 0, void 0, function* () {
    wsRouter_1.wss.handleUpgrade(req, req.ws, req.head, (ws) => {
        ws.addEventListener("message", () => {
            ws.send(JSON.stringify({
                event: "health",
                status: req.heart.alive() ? "alive" : "expired",
                lastHeartbeat: req.heart.lastHeartbeat,
            }));
        });
        req.ws.resume();
    });
}));
//# sourceMappingURL=health.js.map