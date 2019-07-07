// Core
import winston from 'winston';

const log = winston.createLogger({
    level:      'debug',
    transports: [
        new winston.transports.Console({
            level:    'debug',
            colorize: true,
        }),
    ],
    exitOnError: false,
});

export const logger = (req, res, next) => {
    log.debug(`${req.method} ${[ new Date() ]} \n ${JSON.stringify(req.body, null, 2)}`);
    next();
};
