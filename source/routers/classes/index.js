// Core
import express from 'express';
import passport from 'passport';

// Instruments
import { get, post, enroll, expel } from './route';
import { getByHash, putByHash, deleteByHash } from './hash/route';
import { validator, authorization, getPassword } from '../../utils';

// Schema
import { createClass, enrollStudent, expelStudent } from '../../schemas';

export const router = express.Router();
const password = getPassword();

router.get('/', get);
router.post('/', [ passport.authenticate('jwt', { session: false }), authorization(password), validator(createClass) ], post);

router.get('/:classHash', [ passport.authenticate('jwt', { session: false }), authorization(password) ], getByHash);
router.put('/:classHash', [ passport.authenticate('jwt', { session: false }), authorization(password), validator(createClass) ], putByHash);
router.delete('/:classHash', [ passport.authenticate('jwt', { session: false }), authorization(password) ], deleteByHash);

router.post('/enroll', [ passport.authenticate('jwt', { session: false }), authorization(password), validator(enrollStudent) ], enroll);
router.post('/expel', [ passport.authenticate('jwt', { session: false }), authorization(password), validator(expelStudent) ], expel);

export { router as classes };
