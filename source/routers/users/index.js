// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, putByHash, deleteByHash } from './hash/route';
import { limiter, validator, authorization } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();

router.get('/', [ authorization(process.env.PASSWORD), limiter(5, 60 * 1000) ], get);
router.post('/', [ validator(createUser) ], post);

router.get('/:userHash', [ authorization(process.env.PASSWORD) ], getByHash);
router.put('/:userHash', [ authorization(process.env.PASSWORD), validator(createUser) ], putByHash);
router.delete('/:userHash', [ authorization(process.env.PASSWORD) ], deleteByHash);

export { router as users };
