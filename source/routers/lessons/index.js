// Core
import express from 'express';
import passport from 'passport';

// Instruments
import { get, post } from './route';
import { validator, authorization, getPassword } from '../../utils';
import {
    getByHash,
    putByHash,
    deleteByHash,
    postVideos,
    deleteVideo,
    postKeynotes,
    deleteKeynotes,
    getVideoByHash,
    getKeynoteByHash,
} from './hash/route';

// Schema
import { createLesson, createVideo, createKeynote } from '../../schemas';

export const router = express.Router();
const password = getPassword();

router.get('/', get);
router.post('/', [ passport.authenticate('jwt', { session: false }), authorization(password), validator(createLesson) ], post);

router.get('/:lessonHash', [ passport.authenticate('jwt', { session: false }), authorization(password) ], getByHash);
router.put('/:lessonHash', [ passport.authenticate('jwt', { session: false }), authorization(password), validator(createLesson) ], putByHash);
router.delete('/:lessonHash', [ passport.authenticate('jwt', { session: false }), authorization(password) ], deleteByHash);

router.post('/:lessonHash/videos', [ passport.authenticate('jwt', { session: false }), authorization(password), validator(createVideo) ], postVideos);
router.delete('/:lessonHash/videos', [ passport.authenticate('jwt', { session: false }), authorization(password) ], deleteVideo);
router.get('/:lessonHash/videos/:videoHash', [ passport.authenticate('jwt', { session: false }), authorization(password) ], getVideoByHash);

router.post('/:lessonHash/keynotes', [ passport.authenticate('jwt', { session: false }), authorization(password), validator(createKeynote) ], postKeynotes);
router.delete('/:lessonHash/keynotes', [ passport.authenticate('jwt', { session: false }), authorization(password) ], deleteKeynotes);
router.get('/:lessonHash/keynotes/:videoHash', [ passport.authenticate('jwt', { session: false }), authorization(password) ], getKeynoteByHash);

export { router as lessons };
