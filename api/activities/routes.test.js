const request = require('supertest');
const app = require('../../index');

describe('POST /api/activities/list', () => {

    it('should get all seed activities', async () => {
        const response = await request(app).get('/api/activities/list');
        expect(response.status).toBe(200);
        const titles = response.body.map(obj => obj.title);
        expect(titles).toEqual([
            'Dancing with the Shadows of Time',
            'Journeying Through the Eternal Veil',
            'Exploring the Celestial Horizons',
            'Navigating the Cosmic Labyrinth',
            'Embracing the Whispers of Dawn',
            'Discovering Forgotten Realms',
            'Traversing the Enigmatic Paths',
            'Capturing Fragments of Eternity',
            'Sailing the Sea of Lost Dreams',
            'Unraveling the Secrets of Night',
        ]);
    });

});

describe('POST /api/activities/completed/mark', () => {

    it('should allow user to mark activity as completed', async () => {

        // login and get token
        const login_response = await request(app)
            .post('/api/user/login')
            .send({ email: 'john@example.com', password: 'password' });
        expect(login_response.status).toBe(200);
        const token = login_response.body.token

        // get activity
        const activities_response = await request(app).get('/api/activities/list');
        const activity = activities_response.body[0]

        // mark activity as completed
        const mark_response = await request(app)
            .post('/api/activities/completed/mark')
            .set('Authorization', `Bearer ${token}`)
            .send({ activity_id: activity.id });
        expect(mark_response.status).toBe(201);

        // activity already marked as completed
        const second_mark_response = await request(app)
            .post('/api/activities/completed/mark')
            .set('Authorization', `Bearer ${token}`)
            .send({ activity_id: activity.id });
        expect(second_mark_response.status).toBe(200);

        expect(second_mark_response.body.data).toEqual(mark_response.body.data)

    });

    it('should 404 on incorrect activity id', async () => {

        // login and get token
        const login_response = await request(app)
            .post('/api/user/login')
            .send({ email: 'john@example.com', password: 'password' });
        expect(login_response.status).toBe(200);
        const token = login_response.body.token

        // mark activity as completed
        const mark_response = await request(app)
            .post('/api/activities/completed/mark')
            .set('Authorization', `Bearer ${token}`)
            .send({ activity_id: -1 });
        expect(mark_response.status).toBe(404);
    });
});

describe('POST /api/activities/completed/list', () => {

    it('should list activities marked as completed', async () => {

        // login and get token
        const login_response = await request(app)
            .post('/api/user/login')
            .send({ email: 'john@example.com', password: 'password' });
        expect(login_response.status).toBe(200);
        const token = login_response.body.token

        // mark activities as completed
        const activities_response = await request(app).get('/api/activities/list');
        const activity_a = activities_response.body[2]
        const activity_b = activities_response.body[3]

        const mark_a_response = await request(app)
            .post('/api/activities/completed/mark')
            .set('Authorization', `Bearer ${token}`)
            .send({ activity_id: activity_a.id });
        expect(mark_a_response.status).toBe(201);

        const mark_b_response = await request(app)
            .post('/api/activities/completed/mark')
            .set('Authorization', `Bearer ${token}`)
            .send({ activity_id: activity_b.id });
        expect(mark_b_response.status).toBe(201);

        // get completed activities list
        const completed_activities_response = await request(app)
            .get('/api/activities/completed/list')
            .set('Authorization', `Bearer ${token}`);
        expect(completed_activities_response.status).toBe(200);

        // expect(completed_activities_response.body).toEqual("goo")
        expect(completed_activities_response.body.data[0].title)
            .toEqual("Dancing with the Shadows of Time");
        expect(completed_activities_response.body.data[1].title)
            .toEqual("Exploring the Celestial Horizons");
        expect(completed_activities_response.body.data[2].title)
            .toEqual("Navigating the Cosmic Labyrinth");
    });

});
