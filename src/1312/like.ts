import { agent, logToFile } from "../shared";

export async function treizeDouzeLike() {
    // Verify env variables are present
    if (!process.env.TREIZEDOUZE_USERNAME || !process.env.TREIZEDOUZE_PASSWORD) {
        logToFile("ERROR: Missing environment variables!");
        process.exit(1);
    }

    try {
        await agent.login({
            identifier: process.env.TREIZEDOUZE_USERNAME,
            password: process.env.TREIZEDOUZE_PASSWORD
        });

        const query = "flic";

        let { data } = await agent.app.bsky.feed.searchPosts({
            q: query,
            limit: 100,
        },
        {
            headers: {
                "Accept-Language": "fr",
            }
        });

        logToFile(`Fetched ${data.posts.length} posts with query "${query}"`);

        const { posts: postsArray, cursor: nextPage } = data;

        postsArray.forEach(async (item) => {

            let uri: string = item.uri;
            let cid: string = item.cid;

            if (uri && cid) {
                await agent.like(uri, cid)
            }

        });

    } catch (error) {
        logToFile(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}