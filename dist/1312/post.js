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
exports.treizeDouzePost = treizeDouzePost;
const shared_1 = require("../shared");
function treizeDouzePost() {
    return __awaiter(this, void 0, void 0, function* () {
        // Verify env variables are present
        if (!process.env.TREIZEDOUZE_USERNAME || !process.env.TREIZEDOUZE_PASSWORD) {
            (0, shared_1.logToFile)("ERROR: Missing environment variables!");
            process.exit(1);
        }
        const phrases = [
            "oui, il est bien 13h12 !",
            "il est 13h12.",
            "je confirme qu'il est 13h12.",
            "*regarde sa montre* - ouais, il est bien 13h12 :)",
            "AAAAAAAAAAAAAH ! 1312 1312 1312 1312 1312 1312 1312 1312",
            "13h12, il est.",
            "il est 13h12, c'est l'heure de poster '1312'.",
            "ouaip, 13h12.",
            "yes, il est bien 13h12 \\o/",
            "1312",
            "1312 ".repeat(150),
        ];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        try {
            (0, shared_1.logToFile)("Logging in...");
            yield shared_1.agent.login({
                identifier: process.env.TREIZEDOUZE_USERNAME,
                password: process.env.TREIZEDOUZE_PASSWORD
            });
            (0, shared_1.logToFile)("Posting...");
            yield shared_1.agent.post({
                text: phrase
            });
            (0, shared_1.logToFile)("Posted successfully for 1312");
        }
        catch (error) {
            (0, shared_1.logToFile)(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
            process.exit(1);
        }
    });
}
