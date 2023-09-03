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
exports.heartbeatTimer = exports.Heart = void 0;
const logger_1 = require("@coder/logger");
const fs_1 = require("fs");
/**
 * Provides a heartbeat using a local file to indicate activity.
 */
class Heart {
    constructor(heartbeatPath, isActive) {
        this.heartbeatPath = heartbeatPath;
        this.isActive = isActive;
        this.heartbeatInterval = 60000;
        this.lastHeartbeat = 0;
        this.beat = this.beat.bind(this);
        this.alive = this.alive.bind(this);
    }
    alive() {
        const now = Date.now();
        return now - this.lastHeartbeat < this.heartbeatInterval;
    }
    /**
     * Write to the heartbeat file if we haven't already done so within the
     * timeout and start or reset a timer that keeps running as long as there is
     * activity. Failures are logged as warnings.
     */
    beat() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.alive()) {
                return;
            }
            logger_1.logger.trace("heartbeat");
            this.lastHeartbeat = Date.now();
            if (typeof this.heartbeatTimer !== "undefined") {
                clearTimeout(this.heartbeatTimer);
            }
            this.heartbeatTimer = setTimeout(() => heartbeatTimer(this.isActive, this.beat), this.heartbeatInterval);
            try {
                return yield fs_1.promises.writeFile(this.heartbeatPath, "");
            }
            catch (error) {
                logger_1.logger.warn(error.message);
            }
        });
    }
    /**
     * Call to clear any heartbeatTimer for shutdown.
     */
    dispose() {
        if (typeof this.heartbeatTimer !== "undefined") {
            clearTimeout(this.heartbeatTimer);
        }
    }
}
exports.Heart = Heart;
/**
 * Helper function for the heartbeatTimer.
 *
 * If heartbeat is active, call beat. Otherwise do nothing.
 *
 * Extracted to make it easier to test.
 */
function heartbeatTimer(isActive, beat) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (yield isActive()) {
                beat();
            }
        }
        catch (error) {
            logger_1.logger.warn(error.message);
        }
    });
}
exports.heartbeatTimer = heartbeatTimer;
//# sourceMappingURL=heart.js.map