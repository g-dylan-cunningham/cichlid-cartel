exports.up = function (knex) {
  return knex.schema
    .createTable('species', (table) => {
      table.string('specie_id', 25).primary();
      table.string('region', 80);
      table.string('subgroup', 80);
      table.string('category', 80);
      table.string('common_name', 80);
      table.string('scientific_name', 160);
      table.string('description', 600);
      table.timestamp('created_at').defaultTo(knex.fn.now()).index();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
  knex.schema.dropTable('species');
};

