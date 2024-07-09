const db = require('./db');

// TODO change setup so db is freshly setup for each test

beforeAll(async () => {
    await db.migrate.latest();
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

module.exports = db;
