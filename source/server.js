// Core
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import { Strategy } from 'passport-jwt';

// Instruments
import {
    NotFoundError,
    logger,
    fileLogger,
    notFoundLogger,
    validationLogger,
    sessionOptions,
    corsOptions,
    passportJwtOptions,
} from './utils';

// Routers
import { auth, users, classes, lessons } from './routers';

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));
app.use(session(sessionOptions));

passport.use(new Strategy(passportJwtOptions, function(jwt_payload, done) {
    return done(null, false);
}));

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/classes', classes);
app.use('/api/lessons', lessons);

app.use((req, res, next) => {
    next(new NotFoundError(`Method: ${req.method}, Endpoint: ${req.url} - Not Found`));
});

app.use((error, req, res, next) => {
    if (error.name === 'NotFoundError') {
        notFoundLogger(req.method, req.url);
    } else if (error.name === 'ValidationError') {
        validationLogger(error, req);
    } else {
        fileLogger(error);
    }
    res.status(error.statusCode || 500).json({ message: error.message });
});

process.on('unhandledRejection', (error, promise) => {
    fileLogger(error);
});

process.on('uncaughtException', (error) => {
    fileLogger(error);
});

export { app };
