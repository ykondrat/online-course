import express from 'express';

// Instruments
import { app } from './server';
import { getPort } from './utils';

// Routers
import { auth, users, classes, lessons } from './routers';
import { logger } from './utils';

const PORT = getPort();

app.use(express.json({ limit: '10kb' }));

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

app.use('/', auth);
app.use('/users', users);
app.use('/classes', classes);
app.use('/lessons', lessons);

app.listen(PORT, () => {
    console.log(`Server API is up on port ${PORT}`);
});
