// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { validator, authorization } from '../../utils';
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

router.get('/', get);
router.post('/', [ authorization(process.env.PASSWORD), validator(createLesson) ], post);

router.get('/:lessonHash', [ authorization(process.env.PASSWORD) ], getByHash);
router.put('/:lessonHash', [ authorization(process.env.PASSWORD), validator(createLesson) ], putByHash);
router.delete('/:lessonHash', [ authorization(process.env.PASSWORD) ], deleteByHash);

router.post('/:lessonHash/videos', [ authorization(process.env.PASSWORD), validator(createVideo) ], postVideos);
router.delete('/:lessonHash/videos', [ authorization(process.env.PASSWORD) ], deleteVideo);
router.get('/:lessonHash/videos/:videoHash', [ authorization(process.env.PASSWORD) ], getVideoByHash);

router.post('/:lessonHash/keynotes', [ authorization(process.env.PASSWORD), validator(createKeynote) ], postKeynotes);
router.delete('/:lessonHash/keynotes', [ authorization(process.env.PASSWORD) ], deleteKeynotes);
router.get('/:lessonHash/keynotes/:videoHash', [ authorization(process.env.PASSWORD) ], getKeynoteByHash);

export { router as lessons };
