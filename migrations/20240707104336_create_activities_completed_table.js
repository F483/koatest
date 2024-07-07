/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('activities_completed', (table) => {
        table.increments('id').primary();
		table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.integer('activitie_id').unsigned().notNullable();
        table.foreign('activitie_id').references('id').inTable('activities').onDelete('CASCADE');
    }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('activities');
};
