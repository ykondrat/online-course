// Core
import winston from 'winston';

const logger = winston.createLogger({
    level:      'debug',
    transports: [
        new winston.transports.Console({
            level:    'debug',
            colorize: true,
        }),
    ],
    exitOnError: false,
});
