import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import cors from 'cors';

import { errorHandler } from './middleware/error-handler.ts';
import notesRouter from './router/notes-router.ts';
import { NotesController } from './controller/notes-controller.ts';
import { NotesRepoJson } from './services/note-repo-json.ts';

const log = debug('express-server:app');

export const app = express();
app.disable('x-powered-by');
log('Express app created');

app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));

app.get('/', (_req, res) => {
    res.send('Hello World!');
    return;
});

const repo = new NotesRepoJson();
const controller = new NotesController(repo);

app.use('/api/notes', notesRouter(controller));

app.post('/', (req, res) => {
    log(req.body);
    log(req.params);
    log(req.query);
    res.statusCode = 201;
    res.send('Hello POST');
    return;
});

app.use((_req, res) => {
    res.status(404);
    res.statusMessage = 'Not Found';
    res.json({
        message: 'Resource not found',
    });
    return;
});

app.use(errorHandler);
