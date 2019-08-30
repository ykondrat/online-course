// Instruments
import { ClassesController } from '../../../controllers';

export const getByHash = async (req, res) => {
    try {
        const { classHash } = req.params;
        const model = new ClassesController({ hash: classHash });
        const data = await model.getByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const putByHash = async (req, res) => {
    try {
        const { classHash } = req.params;
        const model = new ClassesController({ hash: classHash, payload: req.body });
        const data = await model.updateByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteByHash = async (req, res) => {
    try {
        const { classHash } = req.params;
        const model = new ClassesController({ hash: classHash });

        await model.removeByHash();

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
