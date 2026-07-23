"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blankSpacePost = blankSpacePost;
const shared_1 = require("../shared");
async function blankSpacePost() {
    console.log("Called blankSpacePost function");
    // Verify env variables are present
    if (!process.env.BLANKSPACE_USERNAME || !process.env.BLANKSPACE_PASSWORD) {
        (0, shared_1.logToFile)("ERROR: Missing environment variables!");
        process.exit(1);
    }
    try {
        await shared_1.agent.login({
            identifier: process.env.BLANKSPACE_USERNAME,
            password: process.env.BLANKSPACE_PASSWORD
        });
        await shared_1.agent.post({
            text: "\n".repeat(150) // More efficient way to create many newlines
        });
        (0, shared_1.logToFile)("Posted successfully for blankspace");
    }
    catch (error) {
        (0, shared_1.logToFile)(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}
