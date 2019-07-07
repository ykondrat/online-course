// Core
import express from 'express';

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
router.post('/', [ authorization(password), validator(createLesson) ], post);

router.get('/:lessonHash', [ authorization(password) ], getByHash);
router.put('/:lessonHash', [ authorization(password), validator(createLesson) ], putByHash);
router.delete('/:lessonHash', [ authorization(password) ], deleteByHash);

router.post('/:lessonHash/videos', [ authorization(password), validator(createVideo) ], postVideos);
router.delete('/:lessonHash/videos', [ authorization(password) ], deleteVideo);
router.get('/:lessonHash/videos/:videoHash', [ authorization(password) ], getVideoByHash);

router.post('/:lessonHash/keynotes', [ authorization(password), validator(createKeynote) ], postKeynotes);
router.delete('/:lessonHash/keynotes', [ authorization(password) ], deleteKeynotes);
router.get('/:lessonHash/keynotes/:videoHash', [ authorization(password) ], getKeynoteByHash);

export { router as lessons };
