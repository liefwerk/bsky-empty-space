import { agent, logToFile } from "../shared";

export async function treizeDouzePost() {
    // Verify env variables are present
    if (!process.env.TREIZEDOUZE_USERNAME || !process.env.TREIZEDOUZE_PASSWORD) {
        logToFile("ERROR: Missing environment variables!");
        process.exit(1);
    }

    try {

        logToFile("Logging in...");
        await agent.login({
            identifier: process.env.TREIZEDOUZE_USERNAME,
            password: process.env.TREIZEDOUZE_PASSWORD
        });

        logToFile("Posting...");
        await agent.post({
            text: "cc, ouais je sais il est toujours pas 13h12, purée j'ai hâte (ceci est un test, ignorez ce message)"
        });

        logToFile("Posted successfully for 1312");

    } catch (error) {
        logToFile(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}
