/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  // development: {
  //   client: 'pg',
  //   connection: { user: 'postgres', database: 'webapp_dev' },
  //   seeds: {
  //     directory: './seeds',
  //   },
  // },

  // production: {
    client: 'pg',
    connection:
      process.env.POSTGRES_URL + '?sslmode=require',
      // (process.env.NODE_ENV === 'development' ? '' : '?sslmode=require'),
    // pool: {
    //   min: 2,
    //   max: 10,
    // },
    // migrations: {
    //   tableName: 'knex_migrations',
    // },
  // },
};
