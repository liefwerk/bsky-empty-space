import { agent, logToFile } from "../shared";

export async function blankSpacePost() {
    console.log("Called blankSpacePost function");

    // Verify env variables are present
    if (!process.env.BLANKSPACE_USERNAME || !process.env.BLANKSPACE_PASSWORD) {
        logToFile("ERROR: Missing environment variables!");
        process.exit(1);
    }

    try {
        await agent.login({
            identifier: process.env.BLANKSPACE_USERNAME,
            password: process.env.BLANKSPACE_PASSWORD
        });

        await agent.post({
            text: "\n".repeat(150)  // More efficient way to create many newlines
        });

        logToFile("Posted successfully for blankspace");
    } catch (error) {
        logToFile(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}
