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

    it('should CRUD', async () => {

        // login and get token
        const login_response = await request(app)
            .post('/api/user/login')
            .send({ email: 'john@example.com', password: 'password' });
        expect(login_response.status).toBe(200);
        const token = login_response.body.token

        //  create
        const create_data = {
            title: 'Dancing with the Shadows of Time',
            description: 'Navigate uncovering secrets of timeless wonders.',
            category: 'Relaxation',
            difficulty: 'Easy',
            duration: 30,
            content: 'Discover hidden realms echoing ancient lore and cosmic wonders.'
        }
        const create_response = await request(app)
            .post('/api/activities/create')
            .set('Authorization', `Bearer ${token}`)
            .send(create_data);
        expect(create_response.status).toBe(201);
        expect(!!create_response.body.data.id).toBe(true);
        expect(!!create_response.body.data.created_at).toBe(true);
        expect(create_response.body.data.title).toEqual(create_data.title);
        expect(create_response.body.data.description).toEqual(create_data.description);
        expect(create_response.body.data.category).toEqual(create_data.category);
        expect(create_response.body.data.difficulty).toEqual(create_data.difficulty);
        expect(create_response.body.data.duration).toEqual(create_data.duration);
        expect(create_response.body.data.content).toEqual(create_data.content);

        //  update
        const update_data = {
            id: create_response.body.data.id,
            title: "Updated title",
            description: create_data.description,
            category: create_data.category,
            difficulty: create_data.difficulty,
            duration: create_data.duration,
            content: create_data.content
        }
        const update_response = await request(app)
            .post('/api/activities/update')
            .set('Authorization', `Bearer ${token}`)
            .send(update_data);
        expect(update_response.status).toBe(200);
        expect(update_response.body.data.id).toEqual(create_response.body.data.id);
        expect(!!update_response.body.data.created_at).toBe(true);
        expect(update_response.body.data.title).toEqual(update_data.title);
        expect(update_response.body.data.description).toEqual(update_data.description);
        expect(update_response.body.data.category).toEqual(update_data.category);
        expect(update_response.body.data.difficulty).toEqual(update_data.difficulty);
        expect(update_response.body.data.duration).toEqual(update_data.duration);
        expect(update_response.body.data.content).toEqual(update_data.content);

        // read
        const read_response = await request(app)
            .post('/api/activities/read')
            .set('Authorization', `Bearer ${token}`)
            .send({ activity_id: update_response.body.data.id });
        expect(read_response.status).toBe(200);
        expect(read_response.body.data.id).toEqual(update_data.id);
        expect(!!read_response.body.data.created_at).toBe(true);
        expect(read_response.body.data.title).toEqual(update_data.title);
        expect(read_response.body.data.description).toEqual(update_data.description);
        expect(read_response.body.data.category).toEqual(update_data.category);
        expect(read_response.body.data.difficulty).toEqual(update_data.difficulty);
        expect(read_response.body.data.duration).toEqual(update_data.duration);
        expect(read_response.body.data.content).toEqual(update_data.content);

        // delete
        const delete_response = await request(app)
            .post('/api/activities/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({ activity_id: update_response.body.data.id });
        expect(delete_response.status).toBe(200);

        // read
        const second_read_response = await request(app)
            .post('/api/activities/read')
            .set('Authorization', `Bearer ${token}`)
            .send({ activity_id: update_response.body.data.id });
        expect(second_read_response.status).toBe(404);
        
        // delete
        const second_delete_response = await request(app)
            .post('/api/activities/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({ activity_id: update_response.body.data.id });
        expect(second_delete_response.status).toBe(404);
    });

    it('should 404 on incorrect id for update', async () => {

        // login and get token
        const login_response = await request(app)
            .post('/api/user/login')
            .send({ email: 'john@example.com', password: 'password' });
        expect(login_response.status).toBe(200);
        const token = login_response.body.token

        //  create
        const create_data = {
            title: 'Dancing with the Shadows of Time',
            description: 'Navigate uncovering secrets of timeless wonders.',
            category: 'Relaxation',
            difficulty: 'Easy',
            duration: 30,
            content: 'Discover hidden realms echoing ancient lore and cosmic wonders.'
        }
        //  update
        const update_data = {
            id: -1,
            title: create_data.title,
            description: create_data.description,
            category: create_data.category,
            difficulty: create_data.difficulty,
            duration: create_data.duration,
            content: create_data.content
        }
        const update_response = await request(app)
            .post('/api/activities/update')
            .set('Authorization', `Bearer ${token}`)
            .send(update_data);

        expect(update_response.status).toBe(404);
    });
});

