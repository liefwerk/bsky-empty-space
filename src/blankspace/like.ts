import { agent, logToFile } from "../shared";

export async function blankSpaceLike() {
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

        let { data } = await agent.app.bsky.feed.searchPosts({
            q: "mental health",
            limit: 100,
        },
        {
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

        logToFile(`Fetched ${data.posts.length} posts`);

        const { posts: postsArray, cursor: nextPage } = data;

        postsArray.forEach(async (item) => {

            let uri: string = item.uri;
            let cid: string = item.cid;

            if (uri && cid) {
                await agent.like(uri, cid)
                logToFile(`Liked post ${uri} with cid ${cid}`);
            }

        });

    } catch (error) {
        logToFile(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}