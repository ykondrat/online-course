// Core
import express from 'express';

// Instruments
import { postLogin, postLogout } from './route';

export const router = express.Router();

router.post('/login', postLogin);
router.post('/logout', postLogout);

export { router as auth };
