// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);
const email = 'test@gmail.com';
const password = 'supperstrongpassword';
let token = '';

describe('get users:', () => {
    beforeAll(async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Authorization', password)
            .send({ email, password });

        token = response.headers[ 'x-token' ];

        done();
    });

    test('should return status code 200', async (done) => {
        const response = await server
            .get('/api/users')
            .set('Authorization', password)
            .set('X-Token', token);

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return array', async (done) => {
        const response = await server
            .get('/api/users')
            .set('Authorization', password)
            .set('X-Token', token);
        const { data } = response.body;

        expect(Array.isArray(data)).toBeTruthy();
        done();
    });
});
