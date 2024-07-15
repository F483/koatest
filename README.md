# node-test

[![ci](https://github.com/f483/node-test/actions/workflows/node.js.yml/badge.svg)](https://github.com/f483/node-test/actions/workflows/node.js.yml)

Node Test Project

## Commands

 * Start server: `JWT_SECRET=secret node .`
 * Run tests: `npm run test`
 * TODO seed data
 * TODO migrate db

## Improvements Options

 * More tests, all edge cases must be coverd before it can be conscidered production ready.
 * Replace /api/user/auth.js with lib that also has rights management.
 * Jsonschema for API validation and description (express-jsonschema and swagger).
 * Use typescript to increase general robustness.
 * Better ORM with typed models.
 * Support Internationalization
 * Add linting

## Other/Notes

### Useful knex commands

 * Create migration: `npx knex migrate:make create_{NAME} --env test`
 * Create seed data: `npx knex seed:make seed_{NAME} --env test`

