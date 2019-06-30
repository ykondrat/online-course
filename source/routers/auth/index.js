// Core
import express from 'express';

// Instruments
import { postLogin, postLogout } from './route';
import { authorization } from '../../utils';

export const router = express.Router();

router.post('/login', postLogin);
router.post('/logout', [ authorization(process.env.PASSWORD) ], postLogout);

export { router as auth };
