// Core
import express from 'express';
import passport from 'passport';

// Instruments
import { get, post } from './route';
import { getByHash, putByHash, deleteByHash } from './hash/route';
import { limiter, validator, authorization, getPassword } from '../../utils';

// Schema
import { createUser } from '../../schemas';

export const router = express.Router();
const password = getPassword();

router.get('/', [ passport.authenticate('jwt', { session: false }), authorization(password), limiter(5, 60 * 1000) ], get);
router.post('/', [ validator(createUser) ], post);

router.get('/:userHash', [ passport.authenticate('jwt', { session: false }), authorization(password) ], getByHash);
router.put('/:userHash', [ passport.authenticate('jwt', { session: false }), authorization(password), validator(createUser) ], putByHash);
router.delete('/:userHash', [ passport.authenticate('jwt', { session: false }), authorization(password) ], deleteByHash);

export { router as users };
