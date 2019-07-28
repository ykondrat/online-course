export const postLogin = (req, res) => {
    try {
        const { email, password } = req.body;

        req.session.email = email;

        if (email && password) {
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
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
