// Instruments
import { ClassesController } from '../../controllers';

export const get = async (req, res) => {
    try {
        const { page = 1, size = 10 } = req.query;
        const model = new ClassesController({ page, size });
        const data = await model.getAll();

        res.status(200).json({ ...data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    try {
        const model = new ClassesController(req.body);
        const data = await model.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const enroll = async (req, res) => {
    try {
        const { classHash } = req.params;
        const model = new ClassesController({ hash: classHash, payload: req.body });

        await model.enroll();

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const expel = async (req, res) => {
    try {
        const { classHash } = req.params;
        const model = new ClassesController({ hash: classHash, payload: req.body });

        await model.expel();

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
