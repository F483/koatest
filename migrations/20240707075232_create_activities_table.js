/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('activities', (table) => {
        table.increments('id').primary();
		table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('title', 1024).notNullable();
        table.string('description', 8192).notNullable();
        table.enu('category', [
            'Relaxation',
            'Self-Esteem',
            'Productivity',
            'Physical Health',
            'Social Connection'
		]).notNullable();
        table.enu('difficulty', [
            'Easy',
            'Medium',
            'Hard',
		]).notNullable();
        table.bigint('duration').notNullable();
        table.text('content').notNullable();
    }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('activities');
};
