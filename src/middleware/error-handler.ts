import type { Request, Response, NextFunction } from 'express';
import debug from 'debug';
import { ZodError } from 'zod';
import { HttpError } from '../errors/http-error.ts';

const log = debug('express-server:error-handler');
log('Error handler loaded');

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
) => {
    log(err?.message);

    res.statusCode = 500;
    res.statusMessage = 'Internal Server Error';

    if (err instanceof HttpError) {
        res.statusCode = err.status;
        res.statusMessage = err.statusMessage;
        res.send(err.message);
    } else if (err instanceof ZodError) {
        res.statusCode = 400;
        res.statusMessage = 'Bad Request';
        res.json(err.issues);
    } else if (err instanceof Error) {
        res.send(err.message);
    } else {
        res.send(err);
    }

    return;
};
