// Instruments
import { ValidationError } from '../index';

export const getPassword = () => {
    const { PASSWORD } = process.env;

    if (!PASSWORD) {
        throw new ValidationError('Environment variable PASSWORD should be specified');
    }

    return PASSWORD;
};
