import express from 'express';
import debug from 'debug';
import { env } from './env.ts';

const log = debug('express-server:index');

const app = express();
log('Express app created');
const port = env.PORT || 3040;

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.post('/', (_req, res) => {
    res.statusCode = 201;
    res.send('Hello POST');
});

app.get('/api', (_req, res) => {
    res.send('API Rest');
});

app.listen(port, () => {
    log(`Example app listening on port ${port}`);
});
