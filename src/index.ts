import * as dotenv from 'dotenv';
import * as process from 'process';

// Import the functions from the other files
import { blankSpaceLike } from './blankspace/like';
import { blankSpacePost } from './blankspace/post';

import { treizeDouzePost } from './1312/post';
import { treizeDouzeLike } from './1312/like';

// Import the shared functions
import { logToFile } from './shared';

dotenv.config();

function handleBlankSpaceAction(action: string) {
    switch (action) {
        case 'like':
            blankSpaceLike();
            break;
        case 'post':
            blankSpacePost();
            break;
        default:
            logToFile("ERROR: Invalid action argument for blankspace");
            process.exit(1);
    }
}

function handle1312Action(action: string) {
    switch (action) {
        case 'post':
            treizeDouzePost();
            break;
        case 'like':
            treizeDouzeLike();
            break;
        default:
            logToFile("ERROR: Invalid action argument for 1312");
            process.exit(1);
    }
}

function handleProject(project: string, action: string) {
    switch (project) {
        case 'blankspace':
            handleBlankSpaceAction(action);
            break;
        case '1312':
            handle1312Action(action);
            break;
        default:
            logToFile("ERROR: Invalid project argument");
            process.exit(1);
    }
}

handleProject(process.argv[2], process.argv[3]);