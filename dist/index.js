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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const api_1 = require("@atproto/api");
const dotenv = __importStar(require("dotenv"));
const process = __importStar(require("process"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
dotenv.config();
const logToFile = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(path.join(__dirname, 'app.log'), logMessage);
    console.log(logMessage);
};
// configure connection to the server, without account authentication
const agent = new api_1.AtpAgent({
    service: 'https://bsky.social',
    persistSession: (evt, sess) => {
        // store the session-data for reuse
    },
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        logToFile("Starting main function...");
        // Verify env variables are present
        if (!process.env.BLUESKY_USERNAME || !process.env.BLUESKY_PASSWORD) {
            logToFile("ERROR: Missing environment variables!");
            process.exit(1);
        }
        try {
            yield agent.login({
                identifier: process.env.BLUESKY_USERNAME,
                password: process.env.BLUESKY_PASSWORD
            });
            logToFile("Login successful!");
            yield agent.post({
                text: "\n".repeat(150) // More efficient way to create many newlines
            });
            logToFile("Post successful!");
        }
        catch (error) {
            logToFile(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
            process.exit(1);
        }
    });
}
main();
