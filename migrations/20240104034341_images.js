exports.up = function (knex) {
  return knex.schema
    .createTable('images', (table) => {
      table.string('image_id', 25).primary();
      table.string('specie_id'); //.unsigned();
      table.foreign('specie_id').references('specie_id').inTable('species');
      table.boolean('is_primary').defaultTo(false);
      table.boolean('is_secondary').defaultTo(false);
      table.boolean('is_thumbnail').defaultTo(false);
      table.string('key');
      table.string('url');
      table.string('thumbnail_url');
      table.string('full_image_url');
      table.string('full_image_key');
      table.timestamp('created_at').defaultTo(knex.fn.now()).index();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  knex.schema.dropTable('images');
};
