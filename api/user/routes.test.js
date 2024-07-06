const request = require('supertest');
const app = require('../../index');

describe('POST /api/user/names', () => {

    it('should get all users', async () => {
        const response = await request(app).get('/api/user/names');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
          'John Doe',
          'Jane Doe',
        ]);
    });

});
