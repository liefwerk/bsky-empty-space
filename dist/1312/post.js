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
            "1312 ".repeat(50),
            "ACAB (ouais)",
            "🤖 < 00110001 00110011 00110001 00110010",
            "Autre Fun Fact: En France, il est 13h12 au moins une fois par jour.",
            "🤖 < 0x31333132",
            "Ding Ding, it's cop hating hour",
            "Entendu en concert : 'Les flics sont des sacs à merde!'",
            "Également entendu en concert : 'It's fun to stay at the -- A.C.A.B. !'",
            "il est 13h12, c'est l'heure de reblousker '1312'",
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH !",
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH (CAB)!",
            "🤓 < MTMxMg==",
            "TREIZE DOUZE",
            "ACCCABB",
            "Le matin: ACAB. Le midi: ACAB. Au goûter: ACAB. Le soir: ACAB. En insomnie ? ACAB.",
            "Il était 13h12 mais tu l'as vu trop tard. C'est pas grave, continue de scroller tu l'auras la prochaine fois.",
            "Fun Fact: Une fois par heure, il est 13h12 quelquepart dans le monde.",
            "1312!",
            "Affirmation positive du jour: ACAB",
            "(A+C)+(A+B)=1312",
            "Plus d'Apaches, moins de Lucky Lukes",
            "Pro Tip: Évitez d'utiliser ACAB comme mot de passe, préférez plutôt 4C48 c'est plus safe.",
        ];
        const today = new Date();
        const isTreizeDouze = (today.getDate() === 13 && today.getMonth() === 11); // December is month 11 (0-based)
        const phrase = isTreizeDouze ? "Super fun cool fact, aujourd'hui c'est le jour du 1312 !" : phrases[Math.floor(Math.random() * phrases.length)];
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
