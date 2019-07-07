// Core
import winston from 'winston';
import path from 'path';

const logger = winston.createLogger({
    level:       'error',
    transports:  [ new winston.transports.File({ filename: path.join('./logs', 'not_found_errors.log'), level: 'error' }) ],
    exitOnError: false,
});

export const notFoundLogger = (method, endpoint) => {
    if (process.env.NODE_ENV !== 'test') {
        logger.error(`${new Date().toISOString()} ${method}: ${endpoint}`);
    }
};
