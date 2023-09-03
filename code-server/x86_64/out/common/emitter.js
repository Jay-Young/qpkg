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
exports.Emitter = void 0;
const logger_1 = require("@coder/logger");
/**
 * Emitter typecasts for a single event type.
 */
class Emitter {
    constructor() {
        this.listeners = [];
    }
    get event() {
        return (cb) => {
            this.listeners.push(cb);
            return {
                dispose: () => {
                    const i = this.listeners.indexOf(cb);
                    if (i !== -1) {
                        this.listeners.splice(i, 1);
                    }
                },
            };
        };
    }
    /**
     * Emit an event with a value.
     */
    emit(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let resolve;
            const promise = new Promise((r) => (resolve = r));
            yield Promise.all(this.listeners.map((cb) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield cb(value, promise);
                }
                catch (error) {
                    logger_1.logger.error(error.message);
                }
            })));
            resolve();
        });
    }
    dispose() {
        this.listeners = [];
    }
}
exports.Emitter = Emitter;
//# sourceMappingURL=emitter.js.map