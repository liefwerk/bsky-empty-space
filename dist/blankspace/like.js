"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blankSpaceLike = blankSpaceLike;
const shared_1 = require("../shared");
async function blankSpaceLike() {
    // Verify env variables are present
    if (!process.env.BLANKSPACE_USERNAME || !process.env.BLANKSPACE_PASSWORD) {
        (0, shared_1.logToFile)("ERROR: Missing environment variables!");
        process.exit(1);
    }
    try {
        await shared_1.agent.login({
            identifier: process.env.BLANKSPACE_USERNAME,
            password: process.env.BLANKSPACE_PASSWORD
        });
        let { data } = await shared_1.agent.app.bsky.feed.searchPosts({
            q: "mental health",
            limit: 100,
        }, {
            headers: {
                "Accept-Language": "en,fr,es",
            }
        });
        // let { data } = await agent.app.bsky.feed.getFeed({
        //     feed: "at://did:plc:rxuniw3kvxygkka2kszseeyw/app.bsky.feed.generator/aaadzt2eacfci", // abstract art
        //     limit: 10
        // },
        // {
        //     headers: {
        //         "Accept-Language": "en,fr,es",
        //     }
        // });
        (0, shared_1.logToFile)(`Fetched ${data.posts.length} posts`);
        const { posts: postsArray, cursor: nextPage } = data;
        postsArray.forEach(async (item) => {
            let uri = item.uri;
            let cid = item.cid;
            if (uri && cid) {
                await shared_1.agent.like(uri, cid);
                (0, shared_1.logToFile)(`Liked post ${uri} with cid ${cid}`);
            }
        });
    }
    catch (error) {
        (0, shared_1.logToFile)(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}
