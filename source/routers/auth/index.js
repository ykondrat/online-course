// Core
import express from 'express';

// Instruments
import { postLogin, postLogout } from './route';
import { authorization, authentication, getPassword } from '../../utils';

export const router = express.Router();
const password = getPassword();

router.post('/login', [ authentication ], postLogin);
router.post('/logout', [ authorization(password) ], postLogout);

export { router as auth };
