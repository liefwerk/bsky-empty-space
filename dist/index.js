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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const process = __importStar(require("process"));
// Import the functions from the other files
const like_1 = require("./blankspace/like");
const post_1 = require("./blankspace/post");
const post_2 = require("./1312/post");
// Import the shared functions
const shared_1 = require("./shared");
dotenv.config();
function handleBlankSpaceAction(action) {
    switch (action) {
        case 'like':
            (0, like_1.blankSpaceLike)();
            break;
        case 'post':
            (0, post_1.blankSpacePost)();
            break;
        default:
            (0, shared_1.logToFile)("ERROR: Invalid action argument for blankspace");
            process.exit(1);
    }
}
function handle1312Action(action) {
    switch (action) {
        case 'post':
            (0, post_2.treizeDouzePost)();
            break;
        default:
            (0, shared_1.logToFile)("ERROR: Invalid action argument for 1312");
            process.exit(1);
    }
}
function handleProject(project, action) {
    switch (project) {
        case 'blankspace':
            handleBlankSpaceAction(action);
            break;
        case '1312':
            handle1312Action(action);
            break;
        default:
            (0, shared_1.logToFile)("ERROR: Invalid project argument");
            process.exit(1);
    }
}
handleProject(process.argv[2], process.argv[3]);
