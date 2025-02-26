import { AtpAgent, AtpSessionEvent, AtpSessionData } from '@atproto/api'

import * as fs from 'fs';
import * as path from 'path';
import { log } from 'console';

export const logToFile = (message: string) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(path.join(__dirname, 'app.log'), logMessage);
};

export const agent = new AtpAgent({
    service: 'https://bsky.social',
    persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => { }
})

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}