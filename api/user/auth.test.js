const request = require('supertest');
const app = require('../../index');

describe('POST /api/user/profile', () => {

    it('should show logged in user profile', async () => {
        const login_response = await request(app)
            .post('/api/user/login')
            .send({ email: 'john@example.com', password: 'password' });
        expect(login_response.status).toBe(200);

        const token = login_response.body.token

        // check user profile that requires auth
        const profile_response = await request(app).get('/api/user/profile')
			.set('Authorization', `Bearer ${token}`);
        expect(profile_response.status).toBe(200);
        expect(profile_response.body).toEqual({
            name: 'John Doe',
            email: 'john@example.com',
        });
    });

    it('should fail without token', async () => {
        const profile_response = await request(app).get('/api/user/profile');
        expect(profile_response.status).toBe(401);
    });
    
	it('should fail without token', async () => {
        const profile_response = await request(app).get('/api/user/profile')
			.set('Authorization', `Bearer invalid`);
        expect(profile_response.status).toBe(401);
    });
});
