# koatest
Koa Technical Test

## Commands

 * Start server: `JWT_SECRET=secret node .`
 * Run tests: `npm run test`
 * TODO seed data
 * TODO migrate db

## Improvements Options

 * Use typescript 
 * Better ORM that with typed models.
 * Jsonschema for API validation (express-jsonschema and swagger)
 * Support Internationalization
 * Add linting
 * Add github actions for lint and test

## Other/Notes

### Useful knex commands

 * Create migration: `npx knex migrate:make create_{NAME} --env test`
 * Create seed data: `npx knex seed:make seed_{NAME} --env test`

