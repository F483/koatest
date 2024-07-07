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



