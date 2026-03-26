import { Router } from 'express';
import debug from 'debug';
import { resolve, join } from 'node:path';
import { NotesController } from '../controller/notes-controller.ts';
import { NotesRepoJson } from '../services/note-repo-json.ts';

const log = debug('express-server:router:notes');
const router = Router();

const __dirname = resolve('.');
const file = join(__dirname, 'src', 'data', 'db.json');
const repo = new NotesRepoJson(file);

const controller = new NotesController(repo);
log('Notes router created');

router.get('/', controller.getAll);
router.get('/search', controller.query);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.put('/:id', controller.replace);
router.delete('/:id', controller.delete);

export default router;
