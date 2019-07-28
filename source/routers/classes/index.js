// Core
import express from 'express';

// Instruments
import { get, post, enroll, expel } from './route';
import { getByHash, putByHash, deleteByHash } from './hash/route';
import { validator, authorization, getPassword } from '../../utils';

// Schema
import { createClass, enrollStudent, expelStudent } from '../../schemas';

export const router = express.Router();
const password = getPassword();

router.get('/', get);
router.post('/', [ authorization(password), validator(createClass) ], post);

router.get('/:classHash', [ authorization(password) ], getByHash);
router.put('/:classHash', [ authorization(password), validator(createClass) ], putByHash);
router.delete('/:classHash', [ authorization(password) ], deleteByHash);

router.post('/enroll', [ authorization(password), validator(enrollStudent) ], enroll);
router.post('/expel', [ authorization(password), validator(expelStudent) ], expel);

export { router as classes };
