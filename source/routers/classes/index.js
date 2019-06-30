// Core
import express from 'express';

// Instruments
import { get, post, enroll, expel } from './route';
import { getByHash, putByHash, deleteByHash } from './hash/route';
import { validator, authorization } from '../../utils';

// Schema
import { createClass, enrollStudent, expelStudent } from '../../schemas';

export const router = express.Router();

router.get('/', get);
router.post('/', [ authorization(process.env.PASSWORD), validator(createClass) ], post);

router.get('/:classHash', [ authorization(process.env.PASSWORD) ], getByHash);
router.put('/:classHash', [ authorization(process.env.PASSWORD), validator(createClass) ], putByHash);
router.delete('/:classHash', [ authorization(process.env.PASSWORD) ], deleteByHash);

router.post('/enroll', [ authorization(process.env.PASSWORD), validator(enrollStudent) ], enroll);
router.post('/expel', [ authorization(process.env.PASSWORD), validator(expelStudent) ], expel);

export { router as classes };
