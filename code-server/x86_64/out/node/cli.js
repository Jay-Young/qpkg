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
exports.toCodeArgs = exports.shouldOpenInExistingInstance = exports.bindAddrFromArgs = exports.parseConfigFile = exports.readConfigFile = exports.defaultConfigFile = exports.getResolvedPathsFromArgs = exports.setDefaults = exports.redactArgs = exports.parse = exports.optionDescriptions = exports.options = exports.OptionalString = exports.LogLevel = exports.Optional = exports.AuthType = exports.Feature = void 0;
const logger_1 = require("@coder/logger");
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const util_1 = require("./util");
const vscodeSocket_1 = require("./vscodeSocket");
var Feature;
(function (Feature) {
    // No current experimental features!
    Feature["Placeholder"] = "placeholder";
})(Feature || (exports.Feature = Feature = {}));
var AuthType;
(function (AuthType) {
    AuthType["Password"] = "password";
    AuthType["None"] = "none";
})(AuthType || (exports.AuthType = AuthType = {}));
class Optional {
    constructor(value) {
        this.value = value;
    }
}
exports.Optional = Optional;
var LogLevel;
(function (LogLevel) {
    LogLevel["Trace"] = "trace";
    LogLevel["Debug"] = "debug";
    LogLevel["Info"] = "info";
    LogLevel["Warn"] = "warn";
    LogLevel["Error"] = "error";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class OptionalString extends Optional {
}
exports.OptionalString = OptionalString;
exports.options = {
    auth: { type: AuthType, description: "The type of authentication to use." },
    password: {
        type: "string",
        description: "The password for password authentication (can only be passed in via $PASSWORD or the config file).",
    },
    "hashed-password": {
        type: "string",
        description: "The password hashed with argon2 for password authentication (can only be passed in via $HASHED_PASSWORD or the config file). \n" +
            "Takes precedence over 'password'.",
    },
    cert: {
        type: OptionalString,
        path: true,
        description: "Path to certificate. A self signed certificate is generated if none is provided.",
    },
    "cert-host": {
        type: "string",
        description: "Hostname to use when generating a self signed certificate.",
    },
    "cert-key": { type: "string", path: true, description: "Path to certificate key when using non-generated cert." },
    "disable-telemetry": { type: "boolean", description: "Disable telemetry." },
    "disable-update-check": {
        type: "boolean",
        description: "Disable update check. Without this flag, code-server checks every 6 hours against the latest github release and \n" +
            "then notifies you once every week that a new release is available.",
    },
    "session-socket": {
        type: "string",
    },
    "disable-file-downloads": {
        type: "boolean",
        description: "Disable file downloads from Code. This can also be set with CS_DISABLE_FILE_DOWNLOADS set to 'true' or '1'.",
    },
    "disable-workspace-trust": {
        type: "boolean",
        description: "Disable Workspace Trust feature. This switch only affects the current session.",
    },
    "disable-getting-started-override": {
        type: "boolean",
        description: "Disable the coder/coder override in the Help: Getting Started page.",
    },
    "disable-proxy": {
        type: "boolean",
        description: "Disable domain and path proxy routes.",
    },
    // --enable can be used to enable experimental features. These features
    // provide no guarantees.
    enable: { type: "string[]" },
    help: { type: "boolean", short: "h", description: "Show this output." },
    json: { type: "boolean" },
    locale: {
        // The preferred way to set the locale is via the UI.
        type: "string",
        description: `
      Set vscode display language and language to show on the login page, more info see
      https://en.wikipedia.org/wiki/IETF_language_tag
    `,
    },
    open: { type: "boolean", description: "Open in browser on startup. Does not work remotely." },
    "bind-addr": {
        type: "string",
        description: "Address to bind to in host:port. You can also use $PORT to override the port.",
    },
    config: {
        type: "string",
        description: "Path to yaml config file. Every flag maps directly to a key in the config file.",
    },
    // These two have been deprecated by bindAddr.
    host: { type: "string", description: "" },
    port: { type: "number", description: "" },
    socket: { type: "string", path: true, description: "Path to a socket (bind-addr will be ignored)." },
    "socket-mode": { type: "string", description: "File mode of the socket." },
    "trusted-origins": {
        type: "string[]",
        description: "Disables authenticate origin check for trusted origin. Useful if not able to access reverse proxy configuration.",
    },
    version: { type: "boolean", short: "v", description: "Display version information." },
    _: { type: "string[]" },
    "user-data-dir": { type: "string", path: true, description: "Path to the user data directory." },
    "extensions-dir": { type: "string", path: true, description: "Path to the extensions directory." },
    "builtin-extensions-dir": { type: "string", path: true },
    "list-extensions": { type: "boolean", description: "List installed VS Code extensions." },
    force: { type: "boolean", description: "Avoid prompts when installing VS Code extensions." },
    "locate-extension": { type: "string[]" },
    category: { type: "string" },
    "install-extension": {
        type: "string[]",
        description: "Install or update a VS Code extension by id or vsix. The identifier of an extension is `${publisher}.${name}`.\n" +
            "To install a specific version provide `@${version}`. For example: 'vscode.csharp@1.2.3'.",
    },
    "enable-proposed-api": {
        type: "string[]",
        description: "Enable proposed API features for extensions. Can receive one or more extension IDs to enable individually.",
    },
    "uninstall-extension": { type: "string[]", description: "Uninstall a VS Code extension by id." },
    "show-versions": { type: "boolean", description: "Show VS Code extension versions." },
    "github-auth": {
        type: "string",
        description: "GitHub authentication token (can only be passed in via $GITHUB_TOKEN or the config file).",
    },
    "proxy-domain": { type: "string[]", description: "Domain used for proxying ports." },
    "ignore-last-opened": {
        type: "boolean",
        short: "e",
        description: "Ignore the last opened directory or workspace in favor of an empty window.",
    },
    "new-window": {
        type: "boolean",
        short: "n",
        description: "Force to open a new window.",
    },
    "reuse-window": {
        type: "boolean",
        short: "r",
        description: "Force to open a file or folder in an already opened window.",
    },
    log: { type: LogLevel },
    verbose: { type: "boolean", short: "vvv", description: "Enable verbose logging." },
    "app-name": {
        type: "string",
        short: "an",
        description: "The name to use in branding. Will be shown in titlebar and welcome message",
    },
    "welcome-text": {
        type: "string",
        short: "w",
        description: "Text to show on login page",
    },
};
const optionDescriptions = (opts = exports.options) => {
    const entries = Object.entries(opts).filter(([, v]) => !!v.description);
    const widths = entries.reduce((prev, [k, v]) => ({
        long: k.length > prev.long ? k.length : prev.long,
        short: v.short && v.short.length > prev.short ? v.short.length : prev.short,
    }), { short: 0, long: 0 });
    return entries.map(([k, v]) => {
        var _a;
        const help = `${" ".repeat(widths.short - (v.short ? v.short.length : 0))}${v.short ? `-${v.short}` : " "} --${k} `;
        return (help +
            ((_a = v.description) === null || _a === void 0 ? void 0 : _a.trim().split(/\n/).map((line, i) => {
                line = line.trim();
                if (i === 0) {
                    return " ".repeat(widths.long - k.length) + (v.deprecated ? "(deprecated) " : "") + line;
                }
                return " ".repeat(widths.long + widths.short + 6) + line;
            }).join("\n")) +
            (typeof v.type === "object" ? ` [${Object.values(v.type).join(", ")}]` : ""));
    });
};
exports.optionDescriptions = optionDescriptions;
/**
 * Parse arguments into UserProvidedArgs.  This should not go beyond checking
 * that arguments are valid types and have values when required.
 */
const parse = (argv, opts) => {
    const error = (msg) => {
        if (opts === null || opts === void 0 ? void 0 : opts.configFile) {
            msg = `error reading ${opts.configFile}: ${msg}`;
        }
        return new Error(msg);
    };
    const args = {};
    let ended = false;
    for (let i = 0; i < argv.length; ++i) {
        const arg = argv[i];
        // -- signals the end of option parsing.
        if (!ended && arg === "--") {
            ended = true;
            continue;
        }
        // Options start with a dash and require a value if non-boolean.
        if (!ended && arg.startsWith("-")) {
            let key;
            let value;
            if (arg.startsWith("--")) {
                const split = (0, util_1.splitOnFirstEquals)(arg.replace(/^--/, ""));
                key = split[0];
                value = split[1];
            }
            else {
                const short = arg.replace(/^-/, "");
                const pair = Object.entries(exports.options).find(([, v]) => v.short === short);
                if (pair) {
                    key = pair[0];
                }
            }
            if (!key || !exports.options[key]) {
                throw error(`Unknown option ${arg}`);
            }
            if (key === "password" && !(opts === null || opts === void 0 ? void 0 : opts.configFile)) {
                throw new Error("--password can only be set in the config file or passed in via $PASSWORD");
            }
            if (key === "hashed-password" && !(opts === null || opts === void 0 ? void 0 : opts.configFile)) {
                throw new Error("--hashed-password can only be set in the config file or passed in via $HASHED_PASSWORD");
            }
            if (key === "github-auth" && !(opts === null || opts === void 0 ? void 0 : opts.configFile)) {
                throw new Error("--github-auth can only be set in the config file or passed in via $GITHUB_TOKEN");
            }
            const option = exports.options[key];
            if (option.type === "boolean") {
                ;
                args[key] = true;
                continue;
            }
            // Might already have a value if it was the --long=value format.
            if (typeof value === "undefined") {
                // A value is only valid if it doesn't look like an option.
                value = argv[i + 1] && !argv[i + 1].startsWith("-") ? argv[++i] : undefined;
            }
            if (!value && option.type === OptionalString) {
                ;
                args[key] = new OptionalString(value);
                continue;
            }
            else if (!value) {
                throw error(`--${key} requires a value`);
            }
            if (option.type === OptionalString && value === "false") {
                continue;
            }
            if (option.path) {
                value = path.resolve(value);
            }
            switch (option.type) {
                case "string":
                    ;
                    args[key] = value;
                    break;
                case "string[]":
                    if (!args[key]) {
                        ;
                        args[key] = [];
                    }
                    ;
                    args[key].push(value);
                    break;
                case "number":
                    ;
                    args[key] = parseInt(value, 10);
                    if (isNaN(args[key])) {
                        throw error(`--${key} must be a number`);
                    }
                    break;
                case OptionalString:
                    ;
                    args[key] = new OptionalString(value);
                    break;
                default: {
                    if (!Object.values(option.type).includes(value)) {
                        throw error(`--${key} valid values: [${Object.values(option.type).join(", ")}]`);
                    }
                    ;
                    args[key] = value;
                    break;
                }
            }
            continue;
        }
        // Everything else goes into _.
        if (typeof args._ === "undefined") {
            args._ = [];
        }
        args._.push(arg);
    }
    // If a cert was provided a key must also be provided.
    if (args.cert && args.cert.value && !args["cert-key"]) {
        throw new Error("--cert-key is missing");
    }
    logger_1.logger.debug(() => [`parsed ${(opts === null || opts === void 0 ? void 0 : opts.configFile) ? "config" : "command line"}`, (0, logger_1.field)("args", (0, exports.redactArgs)(args))]);
    return args;
};
exports.parse = parse;
/**
 * Redact sensitive information from arguments for logging.
 */
const redactArgs = (args) => {
    return Object.assign(Object.assign({}, args), { password: args.password ? "<redacted>" : undefined, "hashed-password": args["hashed-password"] ? "<redacted>" : undefined, "github-auth": args["github-auth"] ? "<redacted>" : undefined });
};
exports.redactArgs = redactArgs;
/**
 * Take CLI and config arguments (optional) and return a single set of arguments
 * with the defaults set. Arguments from the CLI are prioritized over config
 * arguments.
 */
function setDefaults(cliArgs, configArgs) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const args = Object.assign({}, configArgs || {}, cliArgs);
        if (!args["user-data-dir"]) {
            args["user-data-dir"] = util_1.paths.data;
        }
        if (!args["extensions-dir"]) {
            args["extensions-dir"] = path.join(args["user-data-dir"], "extensions");
        }
        if (!args["session-socket"]) {
            args["session-socket"] = path.join(args["user-data-dir"], "code-server-ipc.sock");
        }
        process.env.CODE_SERVER_SESSION_SOCKET = args["session-socket"];
        // --verbose takes priority over --log and --log takes priority over the
        // environment variable.
        if (args.verbose) {
            args.log = LogLevel.Trace;
        }
        else if (!args.log &&
            process.env.LOG_LEVEL &&
            Object.values(LogLevel).includes(process.env.LOG_LEVEL)) {
            args.log = process.env.LOG_LEVEL;
        }
        // Sync --log, --verbose, the environment variable, and logger level.
        if (args.log) {
            process.env.LOG_LEVEL = args.log;
        }
        switch (args.log) {
            case LogLevel.Trace:
                logger_1.logger.level = logger_1.Level.Trace;
                args.verbose = true;
                break;
            case LogLevel.Debug:
                logger_1.logger.level = logger_1.Level.Debug;
                args.verbose = false;
                break;
            case LogLevel.Info:
                logger_1.logger.level = logger_1.Level.Info;
                args.verbose = false;
                break;
            case LogLevel.Warn:
                logger_1.logger.level = logger_1.Level.Warn;
                args.verbose = false;
                break;
            case LogLevel.Error:
                logger_1.logger.level = logger_1.Level.Error;
                args.verbose = false;
                break;
        }
        // Default to using a password.
        if (!args.auth) {
            args.auth = AuthType.Password;
        }
        const addr = bindAddrFromAllSources(configArgs || {}, cliArgs);
        args.host = addr.host;
        args.port = addr.port;
        if (args.cert && !args.cert.value) {
            const { cert, certKey } = yield (0, util_1.generateCertificate)(args["cert-host"] || "localhost");
            args.cert = {
                value: cert,
            };
            args["cert-key"] = certKey;
        }
        let usingEnvPassword = !!process.env.PASSWORD;
        if (process.env.PASSWORD) {
            args.password = process.env.PASSWORD;
        }
        if ((_a = process.env.CS_DISABLE_FILE_DOWNLOADS) === null || _a === void 0 ? void 0 : _a.match(/^(1|true)$/)) {
            args["disable-file-downloads"] = true;
        }
        if ((_b = process.env.CS_DISABLE_GETTING_STARTED_OVERRIDE) === null || _b === void 0 ? void 0 : _b.match(/^(1|true)$/)) {
            args["disable-getting-started-override"] = true;
        }
        if ((_c = process.env.CS_DISABLE_PROXY) === null || _c === void 0 ? void 0 : _c.match(/^(1|true)$/)) {
            args["disable-proxy"] = true;
        }
        const usingEnvHashedPassword = !!process.env.HASHED_PASSWORD;
        if (process.env.HASHED_PASSWORD) {
            args["hashed-password"] = process.env.HASHED_PASSWORD;
            usingEnvPassword = false;
        }
        if (process.env.GITHUB_TOKEN) {
            args["github-auth"] = process.env.GITHUB_TOKEN;
        }
        // Ensure they're not readable by child processes.
        delete process.env.PASSWORD;
        delete process.env.HASHED_PASSWORD;
        delete process.env.GITHUB_TOKEN;
        // Filter duplicate proxy domains and remove any leading `*.`.
        const proxyDomains = new Set((args["proxy-domain"] || []).map((d) => d.replace(/^\*\./, "")));
        const finalProxies = [];
        for (const proxyDomain of proxyDomains) {
            if (!proxyDomain.includes("{{port}}")) {
                finalProxies.push("{{port}}." + proxyDomain);
            }
            else {
                finalProxies.push(proxyDomain);
            }
        }
        // all proxies are of format anyprefix-{{port}}-anysuffix.{{host}}, where {{host}} is optional
        // e.g. code-8080.domain.tld would match for code-{{port}}.domain.tld and code-{{port}}.{{host}}
        if (finalProxies.length > 0 && !process.env.VSCODE_PROXY_URI) {
            process.env.VSCODE_PROXY_URI = `//${finalProxies[0]}`;
        }
        args["proxy-domain"] = finalProxies;
        args._ = getResolvedPathsFromArgs(args);
        return Object.assign(Object.assign({}, args), { usingEnvPassword,
            usingEnvHashedPassword }); // TODO: Technically no guarantee this is fulfilled.
    });
}
exports.setDefaults = setDefaults;
function getResolvedPathsFromArgs(args) {
    var _a;
    return ((_a = args._) !== null && _a !== void 0 ? _a : []).map((p) => path.resolve(p));
}
exports.getResolvedPathsFromArgs = getResolvedPathsFromArgs;
/**
 * Helper function to return the default config file.
 *
 * @param {string} password - Password passed in (usually from generatePassword())
 * @returns The default config file:
 *
 * - bind-addr: 127.0.0.1:8080
 * - auth: password
 * - password: <password>
 * - cert: false
 */
function defaultConfigFile(password) {
    return `bind-addr: 127.0.0.1:8080
auth: password
password: ${password}
cert: false
`;
}
exports.defaultConfigFile = defaultConfigFile;
/**
 * Reads the code-server yaml config file and returns it as Args.
 *
 * @param configPath Read the config from configPath instead of $CODE_SERVER_CONFIG or the default.
 */
function readConfigFile(configPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!configPath) {
            configPath = process.env.CODE_SERVER_CONFIG;
            if (!configPath) {
                configPath = path.join(util_1.paths.config, "config.yaml");
            }
        }
        yield fs_1.promises.mkdir(path.dirname(configPath), { recursive: true });
        try {
            const generatedPassword = yield (0, util_1.generatePassword)();
            yield fs_1.promises.writeFile(configPath, defaultConfigFile(generatedPassword), {
                flag: "wx", // wx means to fail if the path exists.
            });
            logger_1.logger.info(`Wrote default config file to ${(0, util_1.humanPath)(os.homedir(), configPath)}`);
        }
        catch (error) {
            // EEXIST is fine; we don't want to overwrite existing configurations.
            if (error.code !== "EEXIST") {
                throw error;
            }
        }
        const configFile = yield fs_1.promises.readFile(configPath, "utf8");
        return parseConfigFile(configFile, configPath);
    });
}
exports.readConfigFile = readConfigFile;
/**
 * parseConfigFile parses configFile into ConfigArgs.
 * configPath is used as the filename in error messages
 */
function parseConfigFile(configFile, configPath) {
    if (!configFile) {
        return { config: configPath };
    }
    const config = (0, js_yaml_1.load)(configFile, {
        filename: configPath,
    });
    if (!config || typeof config === "string") {
        throw new Error(`invalid config: ${config}`);
    }
    // We convert the config file into a set of flags.
    // This is a temporary measure until we add a proper CLI library.
    const configFileArgv = Object.entries(config).map(([optName, opt]) => {
        if (opt === true) {
            return `--${optName}`;
        }
        return `--${optName}=${opt}`;
    });
    const args = (0, exports.parse)(configFileArgv, {
        configFile: configPath,
    });
    return Object.assign(Object.assign({}, args), { config: configPath });
}
exports.parseConfigFile = parseConfigFile;
function parseBindAddr(bindAddr) {
    const u = new URL(`http://${bindAddr}`);
    return {
        host: u.hostname,
        // With the http scheme 80 will be dropped so assume it's 80 if missing.
        // This means --bind-addr <addr> without a port will default to 80 as well
        // and not the code-server default.
        port: u.port ? parseInt(u.port, 10) : 80,
    };
}
/**
 * This function creates the bind address
 * using the CLI args.
 */
function bindAddrFromArgs(addr, args) {
    addr = Object.assign({}, addr);
    if (args["bind-addr"]) {
        addr = parseBindAddr(args["bind-addr"]);
    }
    if (args.host) {
        addr.host = args.host;
    }
    if (process.env.PORT) {
        addr.port = parseInt(process.env.PORT, 10);
    }
    if (args.port !== undefined) {
        addr.port = args.port;
    }
    return addr;
}
exports.bindAddrFromArgs = bindAddrFromArgs;
function bindAddrFromAllSources(...argsConfig) {
    let addr = {
        host: "localhost",
        port: 8080,
    };
    for (const args of argsConfig) {
        addr = bindAddrFromArgs(addr, args);
    }
    return addr;
}
/**
 * Determine if it looks like the user is trying to open a file or folder in an
 * existing instance. The arguments here should be the arguments the user
 * explicitly passed on the command line, *NOT DEFAULTS* or the configuration.
 */
const shouldOpenInExistingInstance = (args, sessionSocket) => __awaiter(void 0, void 0, void 0, function* () {
    // Always use the existing instance if we're running from VS Code's terminal.
    if (process.env.VSCODE_IPC_HOOK_CLI) {
        logger_1.logger.debug("Found VSCODE_IPC_HOOK_CLI");
        return process.env.VSCODE_IPC_HOOK_CLI;
    }
    const paths = getResolvedPathsFromArgs(args);
    const client = new vscodeSocket_1.EditorSessionManagerClient(sessionSocket);
    // If these flags are set then assume the user is trying to open in an
    // existing instance since these flags have no effect otherwise.  That means
    // if there is no existing instance we should error rather than falling back
    // to spawning code-server normally.
    const openInFlagCount = ["reuse-window", "new-window"].reduce((prev, cur) => {
        return args[cur] ? prev + 1 : prev;
    }, 0);
    if (openInFlagCount > 0) {
        logger_1.logger.debug("Found --reuse-window or --new-window");
        const socketPath = yield client.getConnectedSocketPath(paths[0]);
        if (!socketPath) {
            throw new Error(`No opened code-server instances found to handle ${paths[0]}`);
        }
        return socketPath;
    }
    // It's possible the user is trying to spawn another instance of code-server.
    // 1. Check if any unrelated flags are set (this should only run when
    //    code-server is invoked exactly like this: `code-server my-file`).
    // 2. That a file or directory was passed.
    // 3. That the socket is active.
    // 4. That an instance exists to handle the path (implied by #3).
    if (Object.keys(args).length === 1 && typeof args._ !== "undefined" && args._.length > 0) {
        if (!(yield client.canConnect())) {
            return undefined;
        }
        const socketPath = yield client.getConnectedSocketPath(paths[0]);
        if (socketPath) {
            logger_1.logger.debug("Found existing code-server socket");
            return socketPath;
        }
    }
    return undefined;
});
exports.shouldOpenInExistingInstance = shouldOpenInExistingInstance;
/**
 * Convert our arguments to VS Code server arguments.
 */
const toCodeArgs = (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return Object.assign(Object.assign({}, args), { "accept-server-license-terms": true, 
        // This seems to be used to make the connection token flags optional (when
        // set to 1.63) but we have always included them.
        compatibility: "1.64", 
        /** Type casting. */
        help: !!args.help, version: !!args.version, port: (_a = args.port) === null || _a === void 0 ? void 0 : _a.toString(), log: args.log ? [args.log] : undefined });
});
exports.toCodeArgs = toCodeArgs;
//# sourceMappingURL=cli.js.map