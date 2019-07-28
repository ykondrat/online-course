// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);
const email = 'test@gmail.com';
const password = 'supperstrongpassword';

let token = '';

describe('delete class by classHash:', () => {
    beforeAll(async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Authorization', password)
            .send({ email, password });

        token = response.headers[ 'x-token' ];

        done();
    });

    test('should return status code 204', async (done) => {
        const response = await server
            .delete('/api/classes/classHash')
            .set('Authorization', password)
            .set('X-Token', token);

        expect(response.statusCode).toBe(204);
        done();
    });
});
