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
exports.handleArgsSocketCatchError = exports.ensureAddress = exports.createApp = exports.listen = void 0;
const logger_1 = require("@coder/logger");
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const http_1 = __importDefault(require("http"));
const httpolyglot = __importStar(require("httpolyglot"));
const util = __importStar(require("../common/util"));
const http_2 = require("./http");
const util_1 = require("./util");
const vscodeSocket_1 = require("./vscodeSocket");
const wsRouter_1 = require("./wsRouter");
const isSocketOpts = (opts) => {
    return !!opts.socket || !opts.host;
};
const listen = (server, opts) => __awaiter(void 0, void 0, void 0, function* () {
    if (isSocketOpts(opts)) {
        try {
            yield fs_1.promises.unlink(opts.socket);
        }
        catch (error) {
            (0, exports.handleArgsSocketCatchError)(error);
        }
    }
    yield new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        server.on("error", reject);
        const onListen = () => {
            // Promise resolved earlier so this is an unrelated error.
            server.off("error", reject);
            server.on("error", (err) => util.logError(logger_1.logger, "http server error", err));
            resolve();
        };
        if (isSocketOpts(opts)) {
            server.listen(opts.socket, onListen);
        }
        else {
            // [] is the correct format when using :: but Node errors with them.
            server.listen(opts.port, opts.host.replace(/^\[|\]$/g, ""), onListen);
        }
    }));
    // NOTE@jsjoeio: we need to chmod after the server is finished
    // listening. Otherwise, the socket may not have been created yet.
    if (isSocketOpts(opts)) {
        if (opts["socket-mode"]) {
            yield fs_1.promises.chmod(opts.socket, opts["socket-mode"]);
        }
    }
});
exports.listen = listen;
/**
 * Create an Express app and an HTTP/S server to serve it.
 */
const createApp = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const router = (0, express_1.default)();
    router.use((0, compression_1.default)());
    const server = args.cert
        ? httpolyglot.createServer({
            cert: args.cert && (yield fs_1.promises.readFile(args.cert.value)),
            key: args["cert-key"] && (yield fs_1.promises.readFile(args["cert-key"])),
        }, router)
        : http_1.default.createServer(router);
    const disposeServer = (0, http_2.disposer)(server);
    yield (0, exports.listen)(server, args);
    const wsRouter = (0, express_1.default)();
    (0, wsRouter_1.handleUpgrade)(wsRouter, server);
    const editorSessionManager = new vscodeSocket_1.EditorSessionManager();
    const editorSessionManagerServer = yield (0, vscodeSocket_1.makeEditorSessionManagerServer)(args["session-socket"], editorSessionManager);
    const disposeEditorSessionManagerServer = (0, http_2.disposer)(editorSessionManagerServer);
    const dispose = () => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all([disposeServer(), disposeEditorSessionManagerServer()]);
    });
    return { router, wsRouter, server, dispose, editorSessionManagerServer };
});
exports.createApp = createApp;
/**
 * Get the address of a server as a string (protocol *is* included) while
 * ensuring there is one (will throw if there isn't).
 *
 * The address might be a URL or it might be a pipe or socket path.
 */
const ensureAddress = (server, protocol) => {
    const addr = server.address();
    if (!addr) {
        throw new Error("Server has no address");
    }
    if (typeof addr !== "string") {
        const host = addr.family === "IPv6" ? `[${addr.address}]` : addr.address;
        return new URL(`${protocol}://${host}:${addr.port}`);
    }
    // If this is a string then it is a pipe or Unix socket.
    return addr;
};
exports.ensureAddress = ensureAddress;
/**
 * Handles the error that occurs in the catch block
 * after we try fs.unlink(args.socket).
 *
 * We extracted into a function so that we could
 * test this logic more easily.
 */
const handleArgsSocketCatchError = (error) => {
    if (!(0, util_1.isNodeJSErrnoException)(error) || error.code !== "ENOENT") {
        throw Error(error.message ? error.message : error);
    }
};
exports.handleArgsSocketCatchError = handleArgsSocketCatchError;
//# sourceMappingURL=app.js.map