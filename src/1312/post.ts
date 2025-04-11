import { agent, logToFile } from "../shared";

export async function treizeDouzePost() {
    // Verify env variables are present
    if (!process.env.TREIZEDOUZE_USERNAME || !process.env.TREIZEDOUZE_PASSWORD) {
        logToFile("ERROR: Missing environment variables!");
        process.exit(1);
    }

    const phrases = [
        "1312 ".repeat(50),
        "oui, il est bien 13h12 !",
        "*regarde sa montre* - ouais, il est bien 13h12 :)",
        "AAAAAAAAAAAAAH ! 1312 1312 1312 1312 1312 1312 1312 1312 1312 1312 1312 1312 1312 1312 1312 1312",
        "OH MON DIEU !!!! IL EST 13H12 !",
        "Il était 13h12 mais tu l'as vu trop tard. C'est pas grave, continue de scroller tu l'auras la prochaine fois.",
        "il est 13h12, c'est l'heure de reblousker '1312' sur bluesky.",
        "ouaip, 13h12.",
        "yes, il est bien 13h12 \\o/",
        "🤖 < 00110001 00110011 00110001 00110010",
        "🤖 < 0x31333132",
        "🤓 < MTMxMg==",
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
