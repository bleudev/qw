import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'qw.log');

export function log<T extends any[]>(...data: T): T {
  let msg = data.join(' ') + '\n';
  fs.appendFileSync(logFile, msg);
  return data;
}

export function logInput(input: string, key: any) {
  log(JSON.stringify({ input, key }, null, 2) + '\n');
}
