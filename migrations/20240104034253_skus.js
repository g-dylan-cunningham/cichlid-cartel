exports.up = function (knex) {
  return knex.schema
    .createTable('skus', (table) => {
      table.string('sku_id', 25).primary();
      table.string('specie_id'); //.unsigned();
      table.foreign('specie_id').references('specie_id').inTable('species');
      table.string('size');
      table.string('price');
      table.string('sex').defaultTo('UNSEXED');;
      table.integer('quantity').defaultTo(1);
      table.boolean('is_available').defaultTo(false).notNullable();
      table.boolean('is_oos').defaultTo(false).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).index();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
  knex.schema.dropTable('skus');
};
