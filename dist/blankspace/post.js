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
exports.blankSpacePost = blankSpacePost;
const shared_1 = require("../shared");
function blankSpacePost() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Called blankSpacePost function");
        // Verify env variables are present
        if (!process.env.BLANKSPACE_USERNAME || !process.env.BLANKSPACE_PASSWORD) {
            (0, shared_1.logToFile)("ERROR: Missing environment variables!");
            process.exit(1);
        }
        try {
            yield shared_1.agent.login({
                identifier: process.env.BLANKSPACE_USERNAME,
                password: process.env.BLANKSPACE_PASSWORD
            });
            yield shared_1.agent.post({
                text: "\n".repeat(150) // More efficient way to create many newlines
            });
            (0, shared_1.logToFile)("Posted successfully for blankspace");
        }
        catch (error) {
            (0, shared_1.logToFile)(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
            process.exit(1);
        }
    });
}
