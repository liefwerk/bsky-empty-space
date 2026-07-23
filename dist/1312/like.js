"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treizeDouzeLike = treizeDouzeLike;
const shared_1 = require("../shared");
async function treizeDouzeLike() {
    // Verify env variables are present
    if (!process.env.TREIZEDOUZE_USERNAME || !process.env.TREIZEDOUZE_PASSWORD) {
        (0, shared_1.logToFile)("ERROR: Missing environment variables!");
        process.exit(1);
    }
    try {
        await shared_1.agent.login({
            identifier: process.env.TREIZEDOUZE_USERNAME,
            password: process.env.TREIZEDOUZE_PASSWORD
        });
        const query = "flic";
        let { data } = await shared_1.agent.app.bsky.feed.searchPosts({
            q: query,
            limit: 100,
        }, {
            headers: {
                "Accept-Language": "fr",
            }
        });
        (0, shared_1.logToFile)(`Fetched ${data.posts.length} posts with query "${query}"`);
        const { posts: postsArray, cursor: nextPage } = data;
        postsArray.forEach(async (item) => {
            let uri = item.uri;
            let cid = item.cid;
            if (uri && cid) {
                await shared_1.agent.like(uri, cid);
            }
        });
    }
    catch (error) {
        (0, shared_1.logToFile)(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}
