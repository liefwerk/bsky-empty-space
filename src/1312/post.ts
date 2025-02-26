import { agent, logToFile } from "../shared";

export async function treizeDouzePost() {
    // Verify env variables are present
    if (!process.env.TREIZEDOUZE_USERNAME || !process.env.TREIZEDOUZE_PASSWORD) {
        logToFile("ERROR: Missing environment variables!");
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
