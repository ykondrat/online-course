// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);
const email = 'test@gmail.com';
const password = 'supperstrongpassword';

let token = '';

describe('put users by usersHash:', () => {
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
            .put('/api/users/usersHash')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({});

        expect(response.statusCode).toBe(400);
        done();
    });

    test('should return status code 200', async (done) => {
        const response = await server
            .put('/api/users/usersHash')
            .set('Authorization', password)
            .set('X-Token', token)
            .send({
                name:     'test',
                email:    'test@gmail.com',
                phone:    '+380999999999',
                password: 'qwerqwerqwer',
                sex:      'm',
                role:     'student',
            });

        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return object', async (done) => {
        const response = await server
            .put('/api/users/usersHash')
            .set('Authorization', password)
            .set('X-Token', token)
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
