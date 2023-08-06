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
exports.splitOnFirstEquals = exports.loadAMDModule = exports.escapeJSON = exports.isNodeJSErrnoException = exports.escapeHtml = exports.isDirectory = exports.isFile = exports.canConnect = exports.open = exports.constructOpenOptions = exports.isWsl = exports.getMediaMime = exports.sanitizeString = exports.isCookieValid = exports.handlePasswordValidation = exports.getPasswordMethod = exports.isHashLegacyMatch = exports.hashLegacy = exports.isHashMatch = exports.hash = exports.generatePassword = exports.generateCertificate = exports.humanPath = exports.getEnvPaths = exports.paths = exports.onLine = void 0;
const argon2 = __importStar(require("argon2"));
const cp = __importStar(require("child_process"));
const crypto = __importStar(require("crypto"));
const env_paths_1 = __importDefault(require("env-paths"));
const fs_1 = require("fs");
const net = __importStar(require("net"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const safe_compare_1 = __importDefault(require("safe-compare"));
const util = __importStar(require("util"));
const xdg_basedir_1 = __importDefault(require("xdg-basedir"));
const constants_1 = require("./constants");
// From https://github.com/chalk/ansi-regex
const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
].join("|");
const re = new RegExp(pattern, "g");
/**
 * Split stdout on newlines and strip ANSI codes.
 */
const onLine = (proc, callback) => {
    let buffer = "";
    if (!proc.stdout) {
        throw new Error("no stdout");
    }
    proc.stdout.setEncoding("utf8");
    proc.stdout.on("data", (d) => {
        const data = buffer + d;
        const split = data.split("\n");
        const last = split.length - 1;
        for (let i = 0; i < last; ++i) {
            callback(split[i].replace(re, ""), split[i]);
        }
        // The last item will either be an empty string (the data ended with a
        // newline) or a partial line (did not end with a newline) and we must
        // wait to parse it until we get a full line.
        buffer = split[last];
    });
};
exports.onLine = onLine;
exports.paths = getEnvPaths();
/**
 * Gets the config and data paths for the current platform/configuration.
 * On MacOS this function gets the standard XDG directories instead of using the native macOS
 * ones. Most CLIs do this as in practice only GUI apps use the standard macOS directories.
 */
function getEnvPaths(platform = process.platform) {
    const paths = (0, env_paths_1.default)("code-server", { suffix: "" });
    const append = (p) => path.join(p, "code-server");
    switch (platform) {
        case "darwin":
            return {
                // envPaths uses native directories so force Darwin to use the XDG spec
                // to align with other CLI tools.
                data: xdg_basedir_1.default.data ? append(xdg_basedir_1.default.data) : paths.data,
                config: xdg_basedir_1.default.config ? append(xdg_basedir_1.default.config) : paths.config,
                // Fall back to temp if there is no runtime dir.
                runtime: xdg_basedir_1.default.runtime ? append(xdg_basedir_1.default.runtime) : paths.temp,
            };
        case "win32":
            return {
                data: paths.data,
                config: paths.config,
                // Windows doesn't have a runtime dir.
                runtime: paths.temp,
            };
        default:
            return {
                data: paths.data,
                config: paths.config,
                // Fall back to temp if there is no runtime dir.
                runtime: xdg_basedir_1.default.runtime ? append(xdg_basedir_1.default.runtime) : paths.temp,
            };
    }
}
exports.getEnvPaths = getEnvPaths;
/**
 * humanPath replaces the home directory in path with ~.
 * Makes it more readable.
 *
 * @param homedir - the home directory(i.e. `os.homedir()`)
 * @param path - a file path
 */
function humanPath(homedir, path) {
    if (!path) {
        return "";
    }
    return path.replace(homedir, "~");
}
exports.humanPath = humanPath;
const generateCertificate = (hostname) => __awaiter(void 0, void 0, void 0, function* () {
    const certPath = path.join(exports.paths.data, `${hostname.replace(/\./g, "_")}.crt`);
    const certKeyPath = path.join(exports.paths.data, `${hostname.replace(/\./g, "_")}.key`);
    // Try generating the certificates if we can't access them (which probably
    // means they don't exist).
    try {
        yield Promise.all([fs_1.promises.access(certPath), fs_1.promises.access(certKeyPath)]);
    }
    catch (error) {
        // Require on demand so openssl isn't required if you aren't going to
        // generate certificates.
        const pem = require("pem");
        const certs = yield new Promise((resolve, reject) => {
            pem.createCertificate({
                selfSigned: true,
                commonName: hostname,
                config: `
[req]
req_extensions = v3_req

[ v3_req ]
basicConstraints = CA:true
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = ${hostname}
`,
            }, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });
        yield fs_1.promises.mkdir(exports.paths.data, { recursive: true });
        yield Promise.all([fs_1.promises.writeFile(certPath, certs.certificate), fs_1.promises.writeFile(certKeyPath, certs.serviceKey)]);
    }
    return {
        cert: certPath,
        certKey: certKeyPath,
    };
});
exports.generateCertificate = generateCertificate;
const generatePassword = (length = 24) => __awaiter(void 0, void 0, void 0, function* () {
    const buffer = Buffer.alloc(Math.ceil(length / 2));
    yield util.promisify(crypto.randomFill)(buffer);
    return buffer.toString("hex").substring(0, length);
});
exports.generatePassword = generatePassword;
/**
 * Used to hash the password.
 */
const hash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield argon2.hash(password);
});
exports.hash = hash;
/**
 * Used to verify if the password matches the hash
 */
const isHashMatch = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    if (password === "" || hash === "" || !hash.startsWith("$")) {
        return false;
    }
    return yield argon2.verify(hash, password);
});
exports.isHashMatch = isHashMatch;
/**
 * Used to hash the password using the sha256
 * algorithm. We only use this to for checking
 * the hashed-password set in the config.
 *
 * Kept for legacy reasons.
 */
const hashLegacy = (str) => {
    return crypto.createHash("sha256").update(str).digest("hex");
};
exports.hashLegacy = hashLegacy;
/**
 * Used to check if the password matches the hash using
 * the hashLegacy function
 */
const isHashLegacyMatch = (password, hashPassword) => {
    const hashedWithLegacy = (0, exports.hashLegacy)(password);
    return (0, safe_compare_1.default)(hashedWithLegacy, hashPassword);
};
exports.isHashLegacyMatch = isHashLegacyMatch;
/**
 * Used to determine the password method.
 *
 * There are three options for the return value:
 * 1. "SHA256" -> the legacy hashing algorithm
 * 2. "ARGON2" -> the newest hashing algorithm
 * 3. "PLAIN_TEXT" -> regular ol' password with no hashing
 *
 * @returns {PasswordMethod} "SHA256" | "ARGON2" | "PLAIN_TEXT"
 */
function getPasswordMethod(hashedPassword) {
    if (!hashedPassword) {
        return "PLAIN_TEXT";
    }
    // This is the new hashing algorithm
    if (hashedPassword.includes("$argon")) {
        return "ARGON2";
    }
    // This is the legacy hashing algorithm
    return "SHA256";
}
exports.getPasswordMethod = getPasswordMethod;
/**
 * Checks if a password is valid and also returns the hash
 * using the PasswordMethod
 */
function handlePasswordValidation({ passwordMethod, passwordFromArgs, passwordFromRequestBody, hashedPasswordFromArgs, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordValidation = {
            isPasswordValid: false,
            hashedPassword: "",
        };
        switch (passwordMethod) {
            case "PLAIN_TEXT": {
                const isValid = passwordFromArgs ? (0, safe_compare_1.default)(passwordFromRequestBody, passwordFromArgs) : false;
                passwordValidation.isPasswordValid = isValid;
                const hashedPassword = yield (0, exports.hash)(passwordFromRequestBody);
                passwordValidation.hashedPassword = hashedPassword;
                break;
            }
            case "SHA256": {
                const isValid = (0, exports.isHashLegacyMatch)(passwordFromRequestBody, hashedPasswordFromArgs || "");
                passwordValidation.isPasswordValid = isValid;
                passwordValidation.hashedPassword = hashedPasswordFromArgs || (yield (0, exports.hashLegacy)(passwordFromRequestBody));
                break;
            }
            case "ARGON2": {
                const isValid = yield (0, exports.isHashMatch)(passwordFromRequestBody, hashedPasswordFromArgs || "");
                passwordValidation.isPasswordValid = isValid;
                passwordValidation.hashedPassword = hashedPasswordFromArgs || "";
                break;
            }
            default:
                break;
        }
        return passwordValidation;
    });
}
exports.handlePasswordValidation = handlePasswordValidation;
/** Checks if a req.cookies.key is valid using the PasswordMethod */
function isCookieValid({ passwordFromArgs = "", cookieKey, hashedPasswordFromArgs = "", passwordMethod, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let isValid = false;
        switch (passwordMethod) {
            case "PLAIN_TEXT":
                isValid = yield (0, exports.isHashMatch)(passwordFromArgs, cookieKey);
                break;
            case "ARGON2":
            case "SHA256":
                isValid = (0, safe_compare_1.default)(cookieKey, hashedPasswordFromArgs);
                break;
            default:
                break;
        }
        return isValid;
    });
}
exports.isCookieValid = isCookieValid;
/** Ensures that the input is sanitized by checking
 * - it's a string
 * - greater than 0 characters
 * - trims whitespace
 */
function sanitizeString(str) {
    // Very basic sanitization of string
    // Credit: https://stackoverflow.com/a/46719000/3015595
    return typeof str === "string" ? str.trim() : "";
}
exports.sanitizeString = sanitizeString;
const mimeTypes = {
    ".aac": "audio/x-aac",
    ".avi": "video/x-msvideo",
    ".bmp": "image/bmp",
    ".css": "text/css",
    ".flv": "video/x-flv",
    ".gif": "image/gif",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".jpe": "image/jpg",
    ".jpeg": "image/jpg",
    ".jpg": "image/jpg",
    ".js": "application/javascript",
    ".json": "application/json",
    ".m1v": "video/mpeg",
    ".m2a": "audio/mpeg",
    ".m2v": "video/mpeg",
    ".m3a": "audio/mpeg",
    ".mid": "audio/midi",
    ".midi": "audio/midi",
    ".mk3d": "video/x-matroska",
    ".mks": "video/x-matroska",
    ".mkv": "video/x-matroska",
    ".mov": "video/quicktime",
    ".movie": "video/x-sgi-movie",
    ".mp2": "audio/mpeg",
    ".mp2a": "audio/mpeg",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
    ".mp4a": "audio/mp4",
    ".mp4v": "video/mp4",
    ".mpe": "video/mpeg",
    ".mpeg": "video/mpeg",
    ".mpg": "video/mpeg",
    ".mpg4": "video/mp4",
    ".mpga": "audio/mpeg",
    ".oga": "audio/ogg",
    ".ogg": "audio/ogg",
    ".ogv": "video/ogg",
    ".png": "image/png",
    ".psd": "image/vnd.adobe.photoshop",
    ".qt": "video/quicktime",
    ".spx": "audio/ogg",
    ".svg": "image/svg+xml",
    ".tga": "image/x-tga",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
    ".txt": "text/plain",
    ".wav": "audio/x-wav",
    ".wasm": "application/wasm",
    ".webm": "video/webm",
    ".webp": "image/webp",
    ".wma": "audio/x-ms-wma",
    ".wmv": "video/x-ms-wmv",
    ".woff": "application/font-woff",
};
const getMediaMime = (filePath) => {
    return (filePath && mimeTypes[path.extname(filePath)]) || "text/plain";
};
exports.getMediaMime = getMediaMime;
/**
 * A helper function that checks if the platform is Windows Subsystem for Linux
 * (WSL)
 *
 * @see https://github.com/sindresorhus/is-wsl/blob/main/index.js
 * @returns {Boolean} boolean if it is WSL
 */
const isWsl = (platform, osRelease, procVersionFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    if (platform !== "linux") {
        return false;
    }
    if (osRelease.toLowerCase().includes("microsoft")) {
        return true;
    }
    try {
        return (yield fs_1.promises.readFile(procVersionFilePath, "utf8")).toLowerCase().includes("microsoft");
    }
    catch (_) {
        return false;
    }
});
exports.isWsl = isWsl;
/**
 * A helper function to construct options for `open` function.
 *
 * Extract to make it easier to test.
 *
 * @param platform - platform on machine
 * @param urlSearch - url.search
 * @returns  an object with args, command, options and urlSearch
 */
function constructOpenOptions(platform, urlSearch) {
    const args = [];
    let command = platform === "darwin" ? "open" : "xdg-open";
    if (platform === "win32" || platform === "wsl") {
        command = platform === "wsl" ? "cmd.exe" : "cmd";
        args.push("/c", "start", '""', "/b");
        urlSearch = urlSearch.replace(/&/g, "^&");
    }
    return {
        args,
        command,
        urlSearch,
    };
}
exports.constructOpenOptions = constructOpenOptions;
/**
 * Try opening an address using whatever the system has set for opening URLs.
 */
const open = (address) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof address === "string") {
        throw new Error("Cannot open socket paths");
    }
    // Web sockets do not seem to work if browsing with 0.0.0.0.
    const url = new URL(address);
    if (url.hostname === "0.0.0.0") {
        url.hostname = "localhost";
    }
    const platform = (yield (0, exports.isWsl)(process.platform, os.release(), "/proc/version")) ? "wsl" : process.platform;
    const { command, args, urlSearch } = constructOpenOptions(platform, url.search);
    url.search = urlSearch;
    const proc = cp.spawn(command, [...args, url.toString()], {});
    yield new Promise((resolve, reject) => {
        proc.on("error", reject);
        proc.on("close", (code) => {
            return code !== 0 ? reject(new Error(`Failed to open with code ${code}`)) : resolve();
        });
    });
});
exports.open = open;
/**
 * Return a promise that resolves with whether the socket path is active.
 */
function canConnect(path) {
    return new Promise((resolve) => {
        const socket = net.connect(path);
        socket.once("error", () => resolve(false));
        socket.once("connect", () => {
            socket.destroy();
            resolve(true);
        });
    });
}
exports.canConnect = canConnect;
const isFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stat = yield fs_1.promises.stat(path);
        return stat.isFile();
    }
    catch (error) {
        return false;
    }
});
exports.isFile = isFile;
const isDirectory = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stat = yield fs_1.promises.stat(path);
        return stat.isDirectory();
    }
    catch (error) {
        return false;
    }
});
exports.isDirectory = isDirectory;
/**
 * Escapes any HTML string special characters, like &, <, >, ", and '.
 *
 * Source: https://stackoverflow.com/a/6234804/3015595
 **/
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
exports.escapeHtml = escapeHtml;
/**
 * A helper function which returns a boolean indicating whether
 * the given error is a NodeJS.ErrnoException by checking if
 * it has a .code property.
 */
function isNodeJSErrnoException(error) {
    return error !== undefined && error.code !== undefined;
}
exports.isNodeJSErrnoException = isNodeJSErrnoException;
// TODO: Replace with proper templating system.
const escapeJSON = (value) => JSON.stringify(value).replace(/"/g, "&quot;");
exports.escapeJSON = escapeJSON;
/**
 * Loads AMD module, typically from a compiled VSCode bundle.
 *
 * @deprecated This should be gradually phased out as code-server migrates to lib/vscode
 * @param amdPath Path to module relative to lib/vscode
 * @param exportName Given name of export in the file
 */
const loadAMDModule = (amdPath, exportName) => __awaiter(void 0, void 0, void 0, function* () {
    // Set default remote native node modules path, if unset
    process.env["VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH"] =
        process.env["VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH"] || path.join(constants_1.vsRootPath, "remote", "node_modules");
    require(path.join(constants_1.vsRootPath, "out/bootstrap-node")).injectNodeModuleLookupPath(process.env["VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH"]);
    const module = yield new Promise((resolve, reject) => {
        require(path.join(constants_1.vsRootPath, "out/bootstrap-amd")).load(amdPath, resolve, reject);
    });
    return module[exportName];
});
exports.loadAMDModule = loadAMDModule;
/**
 * Split a string on the first equals.  The result will always be an array with
 * two items regardless of how many equals there are.  The second item will be
 * undefined if empty or missing.
 */
function splitOnFirstEquals(str) {
    const split = str.split(/=(.+)?/, 2);
    return [split[0], split[1]];
}
exports.splitOnFirstEquals = splitOnFirstEquals;
//# sourceMappingURL=util.js.map