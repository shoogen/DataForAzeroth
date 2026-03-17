// script to download data files during build
import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

async function download(file) {
    const params = { method: 'GET' };
    const arg1 = process?.argv[2];
    if (arg1) params.headers = { 'User-Agent': arg1 };

    const response = await fetch('https://www.dataforazeroth.com/addon/' + file, params);
    if (response.status !== 200) throw 'HTTP failed ' + response.status;

    const stream = fs.createWriteStream('db/' + file);
    return finished(Readable.fromWeb(response.body).pipe(stream));
}

await download('max.lua');
await download('us.lua');
await download('eu.lua');
await download('tw.lua');
await download('kr.lua');