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
exports.SettingsProvider = void 0;
const logger_1 = require("@coder/logger");
const fs_1 = require("fs");
/**
 * Provides read and write access to settings.
 */
class SettingsProvider {
    constructor(settingsPath) {
        this.settingsPath = settingsPath;
    }
    /**
     * Read settings from the file. On a failure return last known settings and
     * log a warning.
     */
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const raw = (yield fs_1.promises.readFile(this.settingsPath, "utf8")).trim();
                return raw ? JSON.parse(raw) : {};
            }
            catch (error) {
                if (error.code !== "ENOENT") {
                    logger_1.logger.warn(error.message);
                }
            }
            return {};
        });
    }
    /**
     * Write settings combined with current settings. On failure log a warning.
     * Settings will be merged shallowly.
     */
    write(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const oldSettings = yield this.read();
                const nextSettings = Object.assign(Object.assign({}, oldSettings), settings);
                yield fs_1.promises.writeFile(this.settingsPath, JSON.stringify(nextSettings, null, 2));
            }
            catch (error) {
                logger_1.logger.warn(error.message);
            }
        });
    }
}
exports.SettingsProvider = SettingsProvider;
//# sourceMappingURL=settings.js.map