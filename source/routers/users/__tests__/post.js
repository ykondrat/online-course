// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);

describe('post users:', () => {
    test('should return status code 400', async (done) => {
        const response = await server
            .post('/api/users')
            .send({});

        expect(response.statusCode).toBe(400);
        done();
    });

    test('should return status code 201', async (done) => {
        const response = await server
            .post('/api/users')
            .send({
                name:     'test',
                email:    'test@gmail.com',
                phone:    '+380938141326',
                password: 'qwerqwerqwer',
                sex:      'm',
                role:     'student',
            });

        expect(response.statusCode).toBe(201);
        done();
    });

    test('should return object', async (done) => {
        const response = await server
            .post('/api/users')
            .send({
                name:     'test',
                email:    'test@gmail.com',
                phone:    '+380999999999',
                password: 'qwerqwerqwer',
                sex:      'm',
                role:     'student',
            });
        const { data } = response.body;

        expect(typeof data).toBe('object');
        done();
    });
});
