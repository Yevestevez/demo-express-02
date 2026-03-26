import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import { customHeaders, customLogger } from './middleware/customs.ts';
import { errorHandler } from './middleware/error-handler.ts';
import notesRouter from './router/notes-router.ts';
// import { HttpError } from './errors/http-error.ts';

const log = debug('express-server:app');

export const app = express();
app.disable('x-powered-by');
log('Express app created');

app.use(customHeaders('Edu'));
app.use(customLogger());
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));

app.get('/', (_req, res) => {
    res.send('Hello World!');
    return;
});

app.get('/api', (_req, res) => {
    res.setHeader('X-Owner', 'Pepe');
    res.send('API Rest');
    return;
});

app.use('/api/notes', notesRouter);

app.post('/', (req, res) => {
    log(req.body);
    log(req.params);
    log(req.query);
    res.statusCode = 201;
    res.send('Hello POST');
    return;
});

app.use((_req, res) => {
    //next(new HttpError(404, 'Not Found', 'Ruta no encontrada'));
    res.status(404);
    res.statusMessage = 'Not Found';
    res.json({
        message: 'Resource not found',
    });
    return;
});

app.use(errorHandler);
