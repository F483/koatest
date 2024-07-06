# koatest
Koa Technical Test

## Environment variables

 PORT=3000
 JWT_SECRET // required, error on start if missing


## Improvements options

 * Use typescript 
 * Better ORM that with typed models.
 * Jsonschema for API validation
 * Add linting
 * Add github actions for lint and test

## Notes

### Useful knex commands

 * Create migration: `npx knex migrate:make create_{NAME}_table --env test`
 * Create seed data: `npx knex seed:make seed_{NAME} --env test`

