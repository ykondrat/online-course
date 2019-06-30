// Core
import express from 'express';

// Instruments
import { get, post, enroll, expel } from './route';
import { getByHash, putByHash, deleteByHash } from './hash/route';
import { validator } from '../../utils';

// Schema
import { createClass, enrollStudent, expelStudent } from '../../schemas';

export const router = express.Router();

router.get('/', get);
router.post('/', [ validator(createClass) ], post);

router.get('/:classHash', getByHash);
router.put('/:classHash', [ validator(createClass) ], putByHash);
router.delete('/:classHash', deleteByHash);

router.post('/enroll', [ validator(enrollStudent) ], enroll);
router.post('/expel', [ validator(expelStudent) ], expel);

export { router as classes };
