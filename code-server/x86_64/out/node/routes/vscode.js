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
exports.CodeServerRouteWrapper = void 0;
const logger_1 = require("@coder/logger");
const express = __importStar(require("express"));
const path = __importStar(require("path"));
const util_1 = require("../../common/util");
const cli_1 = require("../cli");
const constants_1 = require("../constants");
const http_1 = require("../http");
const socket_1 = require("../socket");
const util_2 = require("../util");
const wsRouter_1 = require("../wsRouter");
class CodeServerRouteWrapper {
    get wsRouter() {
        return this._wsRouterWrapper.router;
    }
    constructor() {
        this._wsRouterWrapper = (0, wsRouter_1.Router)();
        this._socketProxyProvider = new socket_1.SocketProxyProvider();
        this.router = express.Router();
        //#region Route Handlers
        this.manifest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const appName = req.args["app-name"] || "code-server";
            res.writeHead(200, { "Content-Type": "application/manifest+json" });
            return res.end((0, http_1.replaceTemplates)(req, JSON.stringify({
                name: appName,
                short_name: appName,
                start_url: ".",
                display: "fullscreen",
                description: "Run Code on a remote server.",
                icons: [192, 512].map((size) => ({
                    src: `{{BASE}}/_static/src/browser/media/pwa-icon-${size}.png`,
                    type: "image/png",
                    sizes: `${size}x${size}`,
                })),
            }, null, 2)));
        });
        this.$root = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const isAuthenticated = yield (0, http_1.authenticated)(req);
            const NO_FOLDER_OR_WORKSPACE_QUERY = !req.query.folder && !req.query.workspace;
            // Ew means the workspace was closed so clear the last folder/workspace.
            const FOLDER_OR_WORKSPACE_WAS_CLOSED = req.query.ew;
            if (!isAuthenticated) {
                const to = (0, http_1.self)(req);
                return (0, http_1.redirect)(req, res, "login", {
                    to: to !== "/" ? to : undefined,
                });
            }
            if (NO_FOLDER_OR_WORKSPACE_QUERY && !FOLDER_OR_WORKSPACE_WAS_CLOSED) {
                const settings = yield req.settings.read();
                const lastOpened = settings.query || {};
                // This flag disables the last opened behavior
                const IGNORE_LAST_OPENED = req.args["ignore-last-opened"];
                const HAS_LAST_OPENED_FOLDER_OR_WORKSPACE = lastOpened.folder || lastOpened.workspace;
                const HAS_FOLDER_OR_WORKSPACE_FROM_CLI = req.args._.length > 0;
                const to = (0, http_1.self)(req);
                let folder = undefined;
                let workspace = undefined;
                // Redirect to the last folder/workspace if nothing else is opened.
                if (HAS_LAST_OPENED_FOLDER_OR_WORKSPACE && !IGNORE_LAST_OPENED) {
                    folder = lastOpened.folder;
                    workspace = lastOpened.workspace;
                }
                else if (HAS_FOLDER_OR_WORKSPACE_FROM_CLI) {
                    const lastEntry = path.resolve(req.args._[req.args._.length - 1]);
                    const entryIsFile = yield (0, util_2.isFile)(lastEntry);
                    const IS_WORKSPACE_FILE = entryIsFile && path.extname(lastEntry) === ".code-workspace";
                    if (IS_WORKSPACE_FILE) {
                        workspace = lastEntry;
                    }
                    else if (!entryIsFile) {
                        folder = lastEntry;
                    }
                }
                if (folder || workspace) {
                    return (0, http_1.redirect)(req, res, to, {
                        folder,
                        workspace,
                    });
                }
            }
            // Store the query parameters so we can use them on the next load.  This
            // also allows users to create functionality around query parameters.
            yield req.settings.write({ query: req.query });
            next();
        });
        this.$proxyRequest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            this._codeServerMain.handleRequest(req, res);
        });
        this.$proxyWebsocket = (req) => __awaiter(this, void 0, void 0, function* () {
            const wrappedSocket = yield this._socketProxyProvider.createProxy(req.ws);
            // This should actually accept a duplex stream but it seems Code has not
            // been updated to match the Node 16 types so cast for now.  There does not
            // appear to be any code specific to sockets so this should be fine.
            this._codeServerMain.handleUpgrade(req, wrappedSocket);
            req.ws.resume();
        });
        //#endregion
        /**
         * Fetches a code server instance asynchronously to avoid an initial memory overhead.
         */
        this.ensureCodeServerLoaded = (req, _res, next) => __awaiter(this, void 0, void 0, function* () {
            if (this._codeServerMain) {
                // Already loaded...
                return next();
            }
            // Create the server...
            const { args } = req;
            // See ../../../lib/vscode/src/vs/server/node/server.main.ts:72.
            const createVSServer = yield (0, util_2.loadAMDModule)("vs/server/node/server.main", "createServer");
            try {
                this._codeServerMain = yield createVSServer(null, Object.assign(Object.assign({}, (yield (0, cli_1.toCodeArgs)(args))), { "without-connection-token": true }));
            }
            catch (error) {
                (0, util_1.logError)(logger_1.logger, "CodeServerRouteWrapper", error);
                if (constants_1.isDevMode) {
                    return next(new Error((error instanceof Error ? error.message : error) + " (VS Code may still be compiling)"));
                }
                return next(error);
            }
            return next();
        });
        this.router.get("/", this.ensureCodeServerLoaded, this.$root);
        this.router.get("/manifest.json", this.manifest);
        this.router.all("*", http_1.ensureAuthenticated, this.ensureCodeServerLoaded, this.$proxyRequest);
        this._wsRouterWrapper.ws("*", http_1.ensureOrigin, http_1.ensureAuthenticated, this.ensureCodeServerLoaded, this.$proxyWebsocket);
    }
    dispose() {
        var _a;
        (_a = this._codeServerMain) === null || _a === void 0 ? void 0 : _a.dispose();
        this._socketProxyProvider.stop();
    }
}
exports.CodeServerRouteWrapper = CodeServerRouteWrapper;
//# sourceMappingURL=vscode.js.map