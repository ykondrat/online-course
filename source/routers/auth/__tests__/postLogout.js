// Core
import request from 'supertest';

// Instruments
import { app } from '../../../server';

const server = request.agent(app);

describe('postLogout:', () => {
    test('return 401 without x-token header', async (done) => {
        const response = await server.post('/api/auth/logout');

        expect(response.statusCode).toBe(401);

        done();
    });

    test('should logout user', async (done) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiJzdXBwZXJzdHJvbmdwYXNzd29yZCIsImlhdCI6MTU2NDMzODM1OX0.afG7ggwZ0gTT7K7owV2nK7AI8i7ZkXpnQA5QM1vcO-A';
        const password = 'supperstrongpassword';

        const response = await server
            .post('/api/auth/logout')
            .set('Authorization', password)
            .set('x-token', token);

        expect(response.statusCode).toBe(204);

        done();
    });
});
