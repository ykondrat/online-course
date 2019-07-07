// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, putByHash, deleteByHash } from './hash/route';
import { limiter, validator, authorization, getPassword } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();
const password = getPassword();

router.get('/', [ authorization(password), limiter(5, 60 * 1000) ], get);
router.post('/', [ validator(createUser) ], post);

router.get('/:userHash', [ authorization(password) ], getByHash);
router.put('/:userHash', [ authorization(password), validator(createUser) ], putByHash);
router.delete('/:userHash', [ authorization(password) ], deleteByHash);

export { router as users };
