const db = require('./db');

beforeAll(async () => {
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

module.exports = db;
