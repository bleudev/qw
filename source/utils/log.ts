import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'qw.log');

export function log(...data: any) {
    let msg = data.join(' ') + '\n';
    fs.appendFileSync(logFile, msg);
}

export function logInput(input: string, key: any) {
  log(JSON.stringify({ input, key }, null, 2) + '\n');
}
