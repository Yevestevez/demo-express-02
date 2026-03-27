import { resolve, join } from 'node:path';
import debug from 'debug';

const log = debug('express-server:config');

export const configDB = () => {
    log('Running config db/file connection');
    const __dirname = resolve('.');
    const file = join(__dirname, 'src', 'data', 'db.json');

    return file;
};
