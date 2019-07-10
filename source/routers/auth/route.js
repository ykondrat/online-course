export const postLogin = (req, res) => {
    try {
        const authorization = req.get('authorization');
        const { email } = req.body;

        req.session.email = email;

        if (authorization) {
            res.status(204).end();
        } else {
            res.status(400).json({ message: 'incorrect payload' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const postLogout = (req, res) => {
    try {
        const isAuthorized = true;

        if (isAuthorized) {
            res.status(204).end();
        } else {
            res.status(401).json({ message: 'not authenticated' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
