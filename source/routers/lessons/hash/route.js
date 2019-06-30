export const getByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const putByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteByHash = (req, res) => {
    try {
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const postVideos = (req, res) => {
    try {
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteVideo = (req, res) => {
    try {
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVideoByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const postKeynotes = (req, res) => {
    try {
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteKeynotes = (req, res) => {
    try {
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getKeynoteByHash = (req, res) => {
    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
