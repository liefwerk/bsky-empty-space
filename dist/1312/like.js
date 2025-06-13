"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treizeDouzeLike = treizeDouzeLike;
const shared_1 = require("../shared");
function treizeDouzeLike() {
    return __awaiter(this, void 0, void 0, function* () {
        // Verify env variables are present
        if (!process.env.TREIZEDOUZE_USERNAME || !process.env.TREIZEDOUZE_PASSWORD) {
            (0, shared_1.logToFile)("ERROR: Missing environment variables!");
            process.exit(1);
        }
        try {
            yield shared_1.agent.login({
                identifier: process.env.TREIZEDOUZE_USERNAME,
                password: process.env.TREIZEDOUZE_PASSWORD
            });
            const query = "flic";
            let { data } = yield shared_1.agent.app.bsky.feed.searchPosts({
                q: query,
                limit: 100,
            }, {
                headers: {
                    "Accept-Language": "fr",
                }
            });
            (0, shared_1.logToFile)(`Fetched ${data.posts.length} posts with query "${query}"`);
            const { posts: postsArray, cursor: nextPage } = data;
            postsArray.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                let uri = item.uri;
                let cid = item.cid;
                if (uri && cid) {
                    yield shared_1.agent.like(uri, cid);
                }
            }));
        }
        catch (error) {
            (0, shared_1.logToFile)(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
            process.exit(1);
        }
    });
}
