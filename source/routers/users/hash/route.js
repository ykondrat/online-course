// Instruments
import { UsersController } from '../../../controllers';

export const getByHash = async (req, res) => {
    try {
        const { userHash } = req.params;
        const model = new UsersController({ hash: userHash });
        const data = await model.getByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const putByHash = async (req, res) => {
    try {
        const { userHash } = req.params;
        const model = new UsersController({ hash: userHash, payload: req.body });
        const data = await model.updateByHash();

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteByHash = async (req, res) => {
    try {
        const { userHash } = req.params;
        const model = new UsersController({ hash: userHash });

        await model.removeByHash();
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
