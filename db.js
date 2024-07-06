const knex = require('knex');
const knexConfig = require('./knexfile');

let db = null;
if (process.env.NODE_ENV !== 'test') {
    db = knex(knexConfig.prod);
} else {
    db = knex(knexConfig.test);
}

module.exports = db;
