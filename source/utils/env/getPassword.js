export const getPassword = () => {
    const { PASSWORD } = process.env;

    if (!PASSWORD) {
        throw new Error('Environment variable PASSWORD should be specified');
    }

    return PASSWORD;
};
