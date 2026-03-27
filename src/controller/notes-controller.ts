import debug from 'debug';
import type { NextFunction, Request, Response } from 'express';

import { NotesRepoJson } from '../services/note-repo-json.ts';
import { NoteSchemaDTO } from '../schemas/note.ts';
import { HttpError } from '../errors/http-error.ts';

const log = debug('express-server:controller:notes');

export class NotesController {
    repo: NotesRepoJson;

    constructor(repo: NotesRepoJson) {
        this.repo = repo;
        log('Instance created');
    }

    getAll = async (_req: Request, res: Response) => {
        const notes = await this.repo.read();
        res.json(notes);
        return;
    };

    getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const note = await this.repo.readById(id as string);
            res.json(note);
            return;
        } catch (error) {
            const finalError = new HttpError(
                404,
                'Not Found',
                (error as Error).message,
            );
            finalError.cause = error;
            throw finalError;
        }
    };

    query = async (req: Request, res: Response) => {
        const query = req.query;
        // Código de búsqueda
        res.json(query);
        return;
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = NoteSchemaDTO.parse(req.body);
            const result = await this.repo.create(data);
            res.statusCode = 201;
            res.json(result);
            return;
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = NoteSchemaDTO.parse(req.body);
            const result = await this.repo.updateById(id as string, data);
            res.json(result);
            return;
        } catch (error) {
            const finalError = new HttpError(
                404,
                'Not Found',
                (error as Error).message,
            );
            finalError.cause = error;
            next(finalError);
        }
    };

    replace = (_req: Request, res: Response) => {
        res.status(405);
        res.statusMessage = 'Method Not Allowed';
        res.end();
        return;
    };

    delete = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            this.repo.deleteById(id as string);
            res.status(204);
            res.statusMessage = 'No Content';
            res.end();
            return;
        } catch (error) {
            const finalError = new HttpError(
                404,
                'Not Found',
                (error as Error).message,
            );
            finalError.cause = error;
            next(finalError);
        }
    };
}
