// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);

describe('get lessons:', () => {
    test('should return status code 200', async (done) => {
        const response = await server
            .get('/api/lessons');

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return array', async (done) => {
        const response = await server
            .get('/api/lessons');
        const { data } = response.body;

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });
});
