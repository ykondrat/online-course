// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);
const email = 'test@gmail.com';
const password = 'supperstrongpassword';

let token = '';

describe('enroll student:', () => {
    beforeAll(async (done) => {
        const response = await server
            .post('/api/auth/login')
            .set('Authorization', password)
            .send({ email, password });

        token = response.headers[ 'x-token' ];

        done();
    });

    test('should return status code 400', async (done) => {
        const response = await server
            .post('/api/classes/enroll')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({});

        expect(response.statusCode).toBe(400);
        done();
    });

    test('should return status code 204', async (done) => {
        const response = await server
            .post('/api/classes/enroll')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({
                user:   '',
                status: 'standard',
                notes:  'string',
            });

        expect(response.statusCode).toBe(204);
        done();
    });
});
