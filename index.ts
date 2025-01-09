import { AtpAgent, AtpSessionEvent, AtpSessionData } from '@atproto/api'
import * as dotenv from 'dotenv';
import * as process from 'process';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const logToFile = (message: string) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(path.join(__dirname, 'app.log'), logMessage);
    console.log(logMessage);
};


// configure connection to the server, without account authentication
const agent = new AtpAgent({
  service: 'https://bsky.social',
  persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
    // store the session-data for reuse
  },
})

async function main() {
    logToFile("Starting main function...");
    
    // Verify env variables are present
    if (!process.env.BLUESKY_USERNAME || !process.env.BLUESKY_PASSWORD) {
        logToFile("ERROR: Missing environment variables!");
        process.exit(1);
    }

    try {
        await agent.login({
            identifier: process.env.BLUESKY_USERNAME,
            password: process.env.BLUESKY_PASSWORD
        });
        logToFile("Login successful!");

        await agent.post({
            text: "\n".repeat(150)  // More efficient way to create many newlines
        });
        logToFile("Post successful!");
    } catch (error) {
        logToFile(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}

main();