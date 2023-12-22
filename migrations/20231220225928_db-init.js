// const { uuid } = require('uuidv4');
// SELECT setval(pg_get_serial_sequence('species', '"specieId"'), coalesce(max(specieId)+1, 1), false) FROM species;

// ONLY RUN THIS TO INSTANTIATE THE DB
// npx knex migrate:latest

// changes to db can be recorded by creating a new migration:
// npx knex migrate:make myMigrationName

// you can run migration explicitly
// npx knex migrate:up 20231215034928_test.js

exports.up = function(knex) {
  return knex.schema
    .createTable('species', (table) => {
      table.string('specie_id', 25).primary();
      table.string('region', 80);
      table.string('subgroup', 80);
      table.string('common_name', 80);
      table.string('scientific_name', 160);
      table.string('description', 600);
      table.timestamp('created_at').defaultTo(knex.fn.now()).index();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('skus', (table) => {
      table.string('sku_id', 25).primary();
      table.string("specie_id") //.unsigned();
      table.foreign('specie_id')
        .references('specie_id')
        .inTable('species');
      table.string('size');
      table.string('price');
      table.string('sex');
      table.integer('quantity').defaultTo(1);
      table.boolean('is_available').defaultTo(false).notNullable();
      table.boolean('is_oos').defaultTo(false).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).index();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('images', (table) => {
      table.string('image_id', 25).primary();

      table.string("specie_id") //.unsigned();
      table.foreign('specie_id')
        .references('specie_id')
        .inTable('species');

      // table.string("sku_id") //.unsigned();
      // table.foreign('sku_id')
      //   .references('sku_id')
      //   .inTable('skus');
      table.string("key")
      table.string("url")
      table.string("thumbnail_id")
      table.string("full_image_id")
      table.timestamp('created_at').defaultTo(knex.fn.now()).index();
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};


// exports.up = function (knex) {
//   return knex.schema.createTable("reservations", (table) => {
//     table.increments("reservation_id").primary();
//     table.string("first_name").notNullable();
//     table.string("last_name").notNullable();
//     table.string("mobile_number").notNullable();
//     table.date("reservation_date").notNullable();
//     table.time("reservation_time").notNullable();
//     table.integer("people");
    
//     table.timestamps(true, true);
//   });
// };

// return knex.schema.createTable("tables", (table) => {
//   table.increments("table_id").primary();
//   table.string("table_name").notNullable();
//   table.integer("capacity").unsigned().notNullable();
//   **table.integer("reservation_id").unsigned();**
//   table
//       .foreign("reservation_id")
//       .references("reservation_id")
//       .inTable("reservations")
//       .onDelete("cascade");
//   table.timestamps(true, true);
// })

exports.down = function(knex) {
  knex.schema.dropTable('species').dropTable('skus');
};