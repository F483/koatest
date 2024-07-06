const request = require('supertest');
const app = require('../../index');

describe('POST /api/user/names', () => {

    it('should get all seed users', async () => {
        const response = await request(app).get('/api/user/names');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
          'John Doe',
          'Jane Doe',
        ]);
    });

});

describe('POST /api/user/register', () => {

    it('should register new user', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({ name: 'New User', email: 'new@user.com', password: 'password' });
        expect(response.status).toBe(201);
        expect(!!response.body.token).toBe(true);  // FIXME check if token is valid
    });

});
