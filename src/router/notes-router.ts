import { Router } from 'express';
import debug from 'debug';

import { NotesController } from '../controller/notes-controller.ts';

const log = debug('express-server:router:notes');

const router = (controller: NotesController) => {
    const router = Router();
    log('Notes router created');

    router.get('/', controller.getAll);
    router.get('/search', controller.query);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.patch('/:id', controller.update);
    router.put('/:id', controller.replace);
    router.delete('/:id', controller.delete);

    return router;
};

export default router;
