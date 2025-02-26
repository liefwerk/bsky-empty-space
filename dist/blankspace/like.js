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
exports.blankSpaceLike = blankSpaceLike;
const shared_1 = require("../shared");
function blankSpaceLike() {
    return __awaiter(this, void 0, void 0, function* () {
        // Verify env variables are present
        if (!process.env.BLANKSPACE_USERNAME || !process.env.BLANKSPACE_PASSWORD) {
            (0, shared_1.logToFile)("ERROR: Missing environment variables!");
            process.exit(1);
        }
        try {
            yield shared_1.agent.login({
                identifier: process.env.BLANKSPACE_USERNAME,
                password: process.env.BLANKSPACE_PASSWORD
            });
            let { data } = yield shared_1.agent.app.bsky.feed.getFeed({
                feed: "at://did:plc:rxuniw3kvxygkka2kszseeyw/app.bsky.feed.generator/aaadzt2eacfci", // abstract art
                limit: 10
            }, {
                headers: {
                    "Accept-Language": "en,fr,es",
                }
            });
            (0, shared_1.logToFile)(`Fetched ${data.feed.length} posts`);
            const { feed: postsArray, cursor: nextPage } = data;
            postsArray.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                let uri = item.post.uri;
                let cid = item.post.cid;
                if (uri && cid) {
                    yield shared_1.agent.like(uri, cid);
                    (0, shared_1.logToFile)(`Liked post ${uri}`);
                }
            }));
        }
        catch (error) {
            (0, shared_1.logToFile)(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
            process.exit(1);
        }
    });
}
