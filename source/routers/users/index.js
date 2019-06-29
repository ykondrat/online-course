// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash } from './hash/route';
import { limiter, validator } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();

router.get('/', [ limiter(5, 60 * 1000) ], get);
router.post('/', [ validator(createUser) ], post);

router.get('/:userHash', getByHash);

export { router as users };
