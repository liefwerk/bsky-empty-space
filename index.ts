import { BskyAgent } from '@atproto/api';
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';
import * as process from 'process';

dotenv.config();

// Create a Bluesky Agent 
const agent = new BskyAgent({
    service: 'https://bsky.social'
})


async function main() {
    console.log("Starting main function...");
    try {
        await agent.login({ 
            identifier: process.env.BLUESKY_USERNAME!, 
            password: process.env.BLUESKY_PASSWORD! 
        });
        console.log("Login successful!");

        await agent.post({
            text: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
        });
        console.log("Just posted!");
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();