// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { validator } from '../../utils';
import {
    getByHash,
    putByHash,
    deleteByHash,
    postVideos,
    deleteVideo,
    postKeynotes,
    deleteKeynotes,
    getVideoByHash,
    getKeynoteByHash
} from './hash/route';

// Schema
import { createLesson, createVideo, createKeynote } from '../../schemas';

export const router = express.Router();

router.get('/', get);
router.post('/', [ validator(createLesson) ], post);

router.get('/:lessonHash', getByHash);
router.put('/:lessonHash', [ validator(createLesson) ], putByHash);
router.delete('/:lessonHash', deleteByHash);

router.post('/:lessonHash/videos', [ validator(createVideo) ], postVideos);
router.delete('/:lessonHash/videos', deleteVideo);
router.get('/:lessonHash/videos/:videoHash', getVideoByHash);

router.post('/:lessonHash/keynotes', [ validator(createKeynote) ], postKeynotes);
router.delete('/:lessonHash/keynotes', deleteKeynotes);
router.get('/:lessonHash/keynotes/:videoHash', getKeynoteByHash);

export { router as lessons };
