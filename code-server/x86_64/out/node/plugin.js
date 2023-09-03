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
exports.PluginAPI = exports.codeServer = void 0;
const logger_1 = require("@coder/logger");
const express = __importStar(require("express"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const semver = __importStar(require("semver"));
const http_1 = require("../common/http");
const constants_1 = require("./constants");
const http_2 = require("./http");
const proxy_1 = require("./proxy");
const util = __importStar(require("./util"));
const wsRouter_1 = require("./wsRouter");
const fsp = fs.promises;
/**
 * Inject code-server when `require`d. This is required because the API provides
 * more than just types so these need to be provided at run-time.
 */
const originalLoad = require("module")._load;
require("module")._load = function (request, parent, isMain) {
    return request === "code-server" ? exports.codeServer : originalLoad.apply(this, [request, parent, isMain]);
};
/**
 * The module you get when importing "code-server".
 */
exports.codeServer = {
    HttpCode: http_1.HttpCode,
    HttpError: http_1.HttpError,
    Level: logger_1.Level,
    authenticated: http_2.authenticated,
    ensureAuthenticated: http_2.ensureAuthenticated,
    express,
    field: logger_1.field,
    proxy: proxy_1.proxy,
    replaceTemplates: http_2.replaceTemplates,
    WsRouter: wsRouter_1.Router,
    wss: wsRouter_1.wss,
};
/**
 * PluginAPI implements the plugin API described in typings/pluginapi.d.ts
 * Please see that file for details.
 */
class PluginAPI {
    constructor(logger, 
    /**
     * These correspond to $CS_PLUGIN_PATH and $CS_PLUGIN respectively.
     */
    csPlugin = "", csPluginPath = `${path.join(util.paths.data, "plugins")}:/usr/share/code-server/plugins`, workingDirectory = undefined) {
        this.csPlugin = csPlugin;
        this.csPluginPath = csPluginPath;
        this.workingDirectory = workingDirectory;
        this.plugins = new Map();
        this.logger = logger.named("pluginapi");
    }
    /**
     * applications grabs the full list of applications from
     * all loaded plugins.
     */
    applications() {
        return __awaiter(this, void 0, void 0, function* () {
            const apps = new Array();
            for (const [, p] of this.plugins) {
                if (!p.applications) {
                    continue;
                }
                const pluginApps = yield p.applications();
                // Add plugin key to each app.
                apps.push(...pluginApps.map((app) => {
                    app = Object.assign(Object.assign({}, app), { path: path.join(p.routerPath, app.path || "") });
                    app = Object.assign(Object.assign({}, app), { iconPath: path.join(app.path || "", app.iconPath) });
                    return Object.assign(Object.assign({}, app), { plugin: {
                            name: p.name,
                            version: p.version,
                            modulePath: p.modulePath,
                            displayName: p.displayName,
                            description: p.description,
                            routerPath: p.routerPath,
                            homepageURL: p.homepageURL,
                        } });
                }));
            }
            return apps;
        });
    }
    /**
     * mount mounts all plugin routers onto r and websocket routers onto wr.
     */
    mount(r, wr) {
        for (const [, p] of this.plugins) {
            if (p.router) {
                r.use(`${p.routerPath}`, p.router());
            }
            if (p.wsRouter) {
                wr.use(`${p.routerPath}`, p.wsRouter().router);
            }
        }
    }
    /**
     * loadPlugins loads all plugins based on this.csPlugin,
     * this.csPluginPath and the built in plugins.
     */
    loadPlugins(loadBuiltin = true) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const dir of this.csPlugin.split(":")) {
                if (!dir) {
                    continue;
                }
                yield this.loadPlugin(dir);
            }
            for (const dir of this.csPluginPath.split(":")) {
                if (!dir) {
                    continue;
                }
                yield this._loadPlugins(dir);
            }
            if (loadBuiltin) {
                yield this._loadPlugins(path.join(__dirname, "../../plugins"));
            }
        });
    }
    /**
     * _loadPlugins is the counterpart to loadPlugins.
     *
     * It differs in that it loads all plugins in a single
     * directory whereas loadPlugins uses all available directories
     * as documented.
     */
    _loadPlugins(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entries = yield fsp.readdir(dir, { withFileTypes: true });
                for (const ent of entries) {
                    if (!ent.isDirectory()) {
                        continue;
                    }
                    yield this.loadPlugin(path.join(dir, ent.name));
                }
            }
            catch (error) {
                if (error.code !== "ENOENT") {
                    this.logger.warn(`failed to load plugins from ${q(dir)}: ${error.message}`);
                }
            }
        });
    }
    loadPlugin(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const str = yield fsp.readFile(path.join(dir, "package.json"), {
                    encoding: "utf8",
                });
                const packageJSON = JSON.parse(str);
                for (const [, p] of this.plugins) {
                    if (p.name === packageJSON.name) {
                        this.logger.warn(`ignoring duplicate plugin ${q(p.name)} at ${q(dir)}, using previously loaded ${q(p.modulePath)}`);
                        return;
                    }
                }
                const p = this._loadPlugin(dir, packageJSON);
                this.plugins.set(p.name, p);
            }
            catch (error) {
                if (error.code !== "ENOENT") {
                    this.logger.warn(`failed to load plugin: ${error.stack}`);
                }
            }
        });
    }
    /**
     * _loadPlugin is the counterpart to loadPlugin and actually
     * loads the plugin now that we know there is no duplicate
     * and that the package.json has been read.
     */
    _loadPlugin(dir, packageJSON) {
        dir = path.resolve(dir);
        const logger = this.logger.named(packageJSON.name);
        logger.debug("loading plugin", (0, logger_1.field)("plugin_dir", dir), (0, logger_1.field)("package_json", packageJSON));
        if (!packageJSON.name) {
            throw new Error("plugin package.json missing name");
        }
        if (!packageJSON.version) {
            throw new Error("plugin package.json missing version");
        }
        if (!packageJSON.engines || !packageJSON.engines["code-server"]) {
            throw new Error(`plugin package.json missing code-server range like:
  "engines": {
    "code-server": "^3.7.0"
   }
`);
        }
        if (!semver.satisfies(constants_1.version, packageJSON.engines["code-server"])) {
            this.logger.warn(`plugin range ${q(packageJSON.engines["code-server"])} incompatible` + ` with code-server version ${constants_1.version}`);
        }
        const pluginModule = require(dir);
        if (!pluginModule.plugin) {
            throw new Error("plugin module does not export a plugin");
        }
        const p = Object.assign({ name: packageJSON.name, version: packageJSON.version, modulePath: dir }, pluginModule.plugin);
        if (!p.displayName) {
            throw new Error("plugin missing displayName");
        }
        if (!p.description) {
            throw new Error("plugin missing description");
        }
        if (!p.routerPath) {
            throw new Error("plugin missing router path");
        }
        if (!p.routerPath.startsWith("/")) {
            throw new Error(`plugin router path ${q(p.routerPath)}: invalid`);
        }
        if (!p.homepageURL) {
            throw new Error("plugin missing homepage");
        }
        p.init({
            logger: logger,
            workingDirectory: this.workingDirectory,
        });
        logger.debug("loaded");
        return p;
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(Array.from(this.plugins.values()).map((p) => __awaiter(this, void 0, void 0, function* () {
                if (!p.deinit) {
                    return;
                }
                try {
                    yield p.deinit();
                }
                catch (error) {
                    this.logger.error("plugin failed to deinit", (0, logger_1.field)("name", p.name), (0, logger_1.field)("error", error.message));
                }
            })));
        });
    }
}
exports.PluginAPI = PluginAPI;
function q(s) {
    if (s === undefined) {
        s = "undefined";
    }
    return JSON.stringify(s);
}
//# sourceMappingURL=plugin.js.map