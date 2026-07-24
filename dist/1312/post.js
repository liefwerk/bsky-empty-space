"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treizeDouzePost = treizeDouzePost;
const shared_1 = require("../shared");
async function treizeDouzePost() {
    // Verify env variables are present
    if (!process.env.TREIZEDOUZE_USERNAME || !process.env.TREIZEDOUZE_PASSWORD) {
        (0, shared_1.logToFile)("ERROR: Missing environment variables!");
        process.exit(1);
    }
    const phrases = [
        "1312 ".repeat(50),
        "ACAB (ouais)",
        "Rappel quotidien: taguer ACAB sur un mur",
        "🤖 < 00110001 00110011 00110001 00110010",
        "Autre Fun Fact: A chaque ACAB tagué sur un mur, un petit chaton nait.",
        "ACAB includes Inspecteur Gadget",
        "🤖 < 0x31333132",
        "Ding Ding, it's cop hating hour",
        "Affirmation positive du jour: ACAB",
        "Entendu en concert : 'Les flics sont des sacs à merde!'",
        "Également entendu en concert : 'It's fun to stay at the -- A.C.A.B. !'",
        "il est 13h12, c'est l'heure de reblousker '1312'",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH !",
        "🤓 < MTMxMg==",
        "TREIZE DOUZE",
        "Plus d'Apaches, moins de Lucky Lukes",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH (CAB)!",
        "ACCCABB",
        "Le matin: ACAB. Le midi: ACAB. Au goûter: ACAB. Le soir: ACAB. En insomnie ? ACAB.",
        "Il était 13h12 mais tu l'as vu trop tard. C'est pas grave, continue de scroller tu l'auras la prochaine fois.",
        "Fun Fact: Une fois par heure, il est 13h12 quelquepart dans le monde.",
        "1312!",
        "(A-C)*(A+B)=1312",
        "Pro Tip: Évitez d'utiliser ACAB comme mot de passe, préférez plutôt 4C48 c'est plus safe.",
    ];
    const today = new Date();
    const isTreizeDouze = (today.getDate() === 13 && today.getMonth() === 11); // December is month 11 (0-based)
    const phrase = isTreizeDouze ? "Super fun cool fact, aujourd'hui c'est le jour du 1312 !" : phrases[Math.floor(Math.random() * phrases.length)];
    try {
        await shared_1.agent.login({
            identifier: process.env.TREIZEDOUZE_USERNAME,
            password: process.env.TREIZEDOUZE_PASSWORD
        });
        await shared_1.agent.post({
            text: phrase
        });
        (0, shared_1.logToFile)("Posted successfully for 1312");
    }
    catch (error) {
        (0, shared_1.logToFile)(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}
