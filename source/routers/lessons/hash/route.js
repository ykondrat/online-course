// Instruments
import { LessonsController } from '../../../controllers';

export const getByHash = async (req, res) => {
    try {
        const { lessonHash } = req.params;
        const model = new LessonsController({ hash: lessonHash });
        const data = await model.getByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const putByHash = async (req, res) => {
    try {
        const { lessonHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, payload: req.body });
        const data = await model.updateByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteByHash = async (req, res) => {
    try {
        const { lessonHash } = req.params;
        const model = new LessonsController({ hash: lessonHash });

        await model.removeByHash();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const postVideos = async (req, res) => {
    try {
        const { lessonHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, payload: req.body });
        const data = await model.addVideo();

        res.status(201).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const { lessonHash, videoHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, videoHash });
        await model.removeVideo();

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVideoByHash = async (req, res) => {
    try {
        const { lessonHash, videoHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, videoHash });
        const data = await model.getVideo();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const postKeynotes = async (req, res) => {
    try {
        const { lessonHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, payload: req.body });
        const data = await model.addKeynote();

        res.status(201).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteKeynotes = async (req, res) => {
    try {
        const { lessonHash, keynoteHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, keynoteHash });
        await model.removeKeynote();

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getKeynoteByHash = async (req, res) => {
    try {
        const { lessonHash, keynoteHash } = req.params;
        const model = new LessonsController({ hash: lessonHash, keynoteHash });
        const data = await model.getKeynote();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
