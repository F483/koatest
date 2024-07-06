const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.test);

beforeAll(async () => {
	await db.migrate.latest();
	await db.seed.run();
});

afterAll(async () => {
	await db.destroy();
});

module.exports = db;
