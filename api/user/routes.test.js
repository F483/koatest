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

        // create user
        const create_response = await request(app)
            .post('/api/user/register')
            .send({ name: 'New User', email: 'new@user.com', password: 'password' });
        expect(create_response.status).toBe(201);
        expect(!!create_response.body.token).toBe(true);  // FIXME check if token is valid

        // check if saved
        const names_response = await request(app).get('/api/user/names');
        expect(names_response.status).toBe(200);
        expect(names_response.body).toContain('New User');

        // check login user
        const login_response = await request(app)
            .post('/api/user/login')
            .send({ email: 'new@user.com', password: 'password' });
        expect(login_response.status).toBe(200);
        expect(!!login_response.body.token).toBe(true);  // FIXME check if token is valid
    });

    // FIXME implement and test invalid input
    // FIXME implement and test user already exists

});

describe('POST /api/user/login', () => {

    it('should login user', async () => {
        const response = await request(app)
            .post('/api/user/login')
            .send({ email: 'john@example.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(!!response.body.token).toBe(true);  // FIXME check if token is valid
    });

    // FIXME implement and test invalid input
    // FIXME implement and test user doesn't exist

});
