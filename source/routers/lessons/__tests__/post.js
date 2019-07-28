// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);
const email = 'test@gmail.com';
const password = 'supperstrongpassword';

let token = '';

describe('post lessons:', () => {
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
            .post('/api/lessons')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({});

        expect(response.statusCode).toBe(400);
        done();
    });

    test('should return status code 201', async (done) => {
        const response = await server
            .post('/api/lessons')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({
                title:        'test',
                description:  'test',
                order:        1,
                availability: [ 'standard', 'select', 'premium' ],
            });

        expect(response.statusCode).toBe(201);
        done();
    });

    test('should return object', async (done) => {
        const response = await server
            .post('/api/lessons')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({
                title:        'test',
                description:  'test',
                order:        1,
                availability: [ 'standard', 'select', 'premium' ],
            });
        const { data } = response.body;

        expect(typeof data).toBe('object');
        done();
    });
});
