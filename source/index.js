// Core
import express from 'express';
import { createTerminus } from '@godaddy/terminus';
import session from 'express-session';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

// Instruments
import { app, server } from './server';
import {
    getPort,
    getPassword,
    NotFoundError,
    logger,
    fileLogger,
    notFoundLogger,
    validationLogger,
} from './utils';

// Routers
import { auth, users, classes, lessons } from './routers';

const PORT = getPort();
const PASSWORD = getPassword();

const sessionOptions = {
    key:               'user',
    secret:            PASSWORD,
    resave:            false,
    rolling:           true,
    saveUninitialized: false,
    cookie:            {
        httpOnly: true,
        maxAge:   15 * 60 * 1000,
    },
};
const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:    'secret',
};
const onSignal = () => {
    return Promise.all([ server.close() ]);
};
const onShutdown = () => {
    console.log('\ncleanup finished, server is shutting down\n');
};
const options = {
    signal: 'SIGINT',
    onSignal,
    onShutdown,
};

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

createTerminus(server, options);

server.listen(PORT, () => {
    console.log(`Server API is up on port ${PORT}`);
});
