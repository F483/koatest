/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    await knex('users').del();
    await knex('users').insert([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: '$2a$10$AH79lZMgCNsq0DGflaKnA.tGKSf4HM6QU4fR0LAtAveVfmf7VhJZy' // 'password'
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@example.com',
            password: '$2a$10$AH79lZMgCNsq0DGflaKnA.tGKSf4HM6QU4fR0LAtAveVfmf7VhJZy' // 'password'
        }
    ]);
};
