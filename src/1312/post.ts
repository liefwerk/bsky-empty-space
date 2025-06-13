import { agent, logToFile } from "../shared";

export async function treizeDouzePost() {
    // Verify env variables are present
    if (!process.env.TREIZEDOUZE_USERNAME || !process.env.TREIZEDOUZE_PASSWORD) {
        logToFile("ERROR: Missing environment variables!");
        process.exit(1);
    }

    const phrases = [
        "1312 ".repeat(50),
        "ACAB (ouais)",
        "🤖 < 00110001 00110011 00110001 00110010",
        "Autre Fun Fact: En France, il est 13h12 au moins une fois par jour.",
        "🤖 < 0x31333132",
        "Ding Dong, it's cop hating hour",
        "Entendu en concert : 'Les flics sont des sacs à merde.'",
        "il est 13h12, c'est l'heure de reblousker '1312' sur bluesky.",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH !",
        "🤓 < MTMxMg==",
        "TREIZE DOUZE",
        "ACCCABB",
        "Le matin: ACAB. Le midi: ACAB. Au goûter: ACAB. Le soir: ACAB. En insomnie ? ACAB.",
        "Il était 13h12 mais tu l'as vu trop tard. C'est pas grave, continue de scroller tu l'auras la prochaine fois.",
        "Fun Fact: Une fois par heure, il est 13h12 quelquepart dans le monde.",
        "1312!"
    ];

    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    try {

        logToFile("Logging in...");
        await agent.login({
            identifier: process.env.TREIZEDOUZE_USERNAME,
            password: process.env.TREIZEDOUZE_PASSWORD
        });

        logToFile("Posting...");
        await agent.post({
            text: phrase
        });

        logToFile("Posted successfully for 1312");

    } catch (error) {
        logToFile(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}
