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
exports.EditorSessionManagerClient = exports.EditorSessionManager = exports.makeEditorSessionManagerServer = void 0;
const logger_1 = require("@coder/logger");
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const path = __importStar(require("path"));
const http_1 = require("../common/http");
const app_1 = require("./app");
const util_1 = require("./util");
function makeEditorSessionManagerServer(codeServerSocketPath, editorSessionManager) {
    return __awaiter(this, void 0, void 0, function* () {
        const router = (0, express_1.default)();
        // eslint-disable-next-line import/no-named-as-default-member
        router.use(express_1.default.json());
        router.get("/session", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const filePath = req.query.filePath;
            if (!filePath) {
                res.status(http_1.HttpCode.BadRequest).send("filePath is required");
                return;
            }
            try {
                const socketPath = yield editorSessionManager.getConnectedSocketPath(filePath);
                const response = { socketPath };
                res.json(response);
            }
            catch (error) {
                res.status(http_1.HttpCode.ServerError).send(error);
            }
        }));
        router.post("/add-session", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const request = req.body;
            if (!request.entry) {
                res.status(400).send("entry is required");
            }
            editorSessionManager.addSession(request.entry);
            res.status(200).send();
        }));
        router.post("/delete-session", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const request = req.body;
            if (!request.socketPath) {
                res.status(400).send("socketPath is required");
            }
            editorSessionManager.deleteSession(request.socketPath);
            res.status(200).send();
        }));
        const server = http.createServer(router);
        try {
            yield (0, app_1.listen)(server, { socket: codeServerSocketPath });
        }
        catch (e) {
            logger_1.logger.warn(`Could not create socket at ${codeServerSocketPath}`);
        }
        return server;
    });
}
exports.makeEditorSessionManagerServer = makeEditorSessionManagerServer;
class EditorSessionManager {
    constructor() {
        // Map from socket path to EditorSessionEntry.
        this.entries = new Map();
    }
    addSession(entry) {
        logger_1.logger.debug(`Adding session to session registry: ${entry.socketPath}`);
        this.entries.set(entry.socketPath, entry);
    }
    getCandidatesForFile(filePath) {
        const matchCheckResults = new Map();
        const checkMatch = (entry) => {
            if (matchCheckResults.has(entry.socketPath)) {
                return matchCheckResults.get(entry.socketPath);
            }
            const result = entry.workspace.folders.some((folder) => filePath.startsWith(folder.uri.path + path.sep));
            matchCheckResults.set(entry.socketPath, result);
            return result;
        };
        return Array.from(this.entries.values())
            .reverse() // Most recently registered first.
            .sort((a, b) => {
            // Matches first.
            const aMatch = checkMatch(a);
            const bMatch = checkMatch(b);
            if (aMatch === bMatch) {
                return 0;
            }
            if (aMatch) {
                return -1;
            }
            return 1;
        });
    }
    deleteSession(socketPath) {
        logger_1.logger.debug(`Deleting session from session registry: ${socketPath}`);
        this.entries.delete(socketPath);
    }
    /**
     * Returns the best socket path that we can connect to.
     * We also delete any sockets that we can't connect to.
     */
    getConnectedSocketPath(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidates = this.getCandidatesForFile(filePath);
            let match = undefined;
            for (const candidate of candidates) {
                if (yield (0, util_1.canConnect)(candidate.socketPath)) {
                    match = candidate;
                    break;
                }
                this.deleteSession(candidate.socketPath);
            }
            return match === null || match === void 0 ? void 0 : match.socketPath;
        });
    }
}
exports.EditorSessionManager = EditorSessionManager;
class EditorSessionManagerClient {
    constructor(codeServerSocketPath) {
        this.codeServerSocketPath = codeServerSocketPath;
    }
    canConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, util_1.canConnect)(this.codeServerSocketPath);
        });
    }
    getConnectedSocketPath(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new Promise((resolve, reject) => {
                const opts = {
                    path: "/session?filePath=" + encodeURIComponent(filePath),
                    socketPath: this.codeServerSocketPath,
                    method: "GET",
                };
                const req = http.request(opts, (res) => {
                    let rawData = "";
                    res.setEncoding("utf8");
                    res.on("data", (chunk) => {
                        rawData += chunk;
                    });
                    res.on("end", () => {
                        try {
                            const obj = JSON.parse(rawData);
                            if (res.statusCode === 200) {
                                resolve(obj);
                            }
                            else {
                                reject(new Error("Unexpected status code: " + res.statusCode));
                            }
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                });
                req.on("error", reject);
                req.end();
            });
            return response.socketPath;
        });
    }
    // Currently only used for tests.
    addSession(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                const opts = {
                    path: "/add-session",
                    socketPath: this.codeServerSocketPath,
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        accept: "application/json",
                    },
                };
                const req = http.request(opts, () => {
                    resolve();
                });
                req.on("error", reject);
                req.write(JSON.stringify(request));
                req.end();
            });
        });
    }
}
exports.EditorSessionManagerClient = EditorSessionManagerClient;
//# sourceMappingURL=vscodeSocket.js.map