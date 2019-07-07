// Core
import express from 'express';
import { createTerminus } from '@godaddy/terminus';

// Instruments
import { app, server } from './server';
import { getPort, NotFoundError } from './utils';

// Routers
import { auth, users, classes, lessons } from './routers';
import { logger, fileLogger, notFoundLogger, validationLogger } from './utils';

const PORT = getPort();
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

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

app.use('/', auth);
app.use('/users', users);
app.use('/classes', classes);
app.use('/lessons', lessons);

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
