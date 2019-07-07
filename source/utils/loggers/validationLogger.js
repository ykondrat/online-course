// Core
import winston from 'winston';
import path from 'path';

const logger = winston.createLogger({
    level:       'error',
    transports:  [ new winston.transports.File({ filename: path.join('./logs', 'validation_errors.log'), level: 'error' }) ],
    exitOnError: false,
});

export const validationLogger = (error, req) => {
    if (process.env.NODE_ENV !== 'test') {
        logger.error(`${new Date().toISOString()} ${req.method}: ${req.url} ${error.message} \n ${JSON.stringify(req.body, null, 2)}`);
    }
};
