const request = require('supertest');
const app = require('../../index');

describe('POST /api/math/add', () => {

    it('should add two numbers', async () => {
        const response = await request(app)
            .post('/api/math/add')
            .send({ num1: 5, num2: 10 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ result: 15 });
    });

    it('should return an error if num1 or num2 is not a number', async () => {
        const response = await request(app)
            .post('/api/math/add')
            .send({ num1: 'a', num2: 10 });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Invalid input, both num1 and num2 should be numbers.'
        });
    });
});
