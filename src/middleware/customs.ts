import type { Request, Response, NextFunction } from 'express';
import debug from 'debug';

const log = debug('express-server:middleware');
log('Custom logger loaded');

export const customLogger = () => {
    return (_req: Request, _res: Response, next: NextFunction) => {
        log(`[${_req.method}], ${_req.url}`);
        next();
        return;
    };
};

export const customHeaders = (brand: string) => {
    return (_req: Request, res: Response, next: NextFunction) => {
        res.setHeader('X-Owner', brand);
        next();
        return;
    };
};
