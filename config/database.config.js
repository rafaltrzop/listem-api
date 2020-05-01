module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
  },

  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
  },

  production: {
    use_env_variable: 'DATABASE_URL',
    // TODO
    // dialect: 'postgres',
    // TODO
    // protocol: 'postgres',
    // TODO
    // dialectOptions: {
    //   ssl: true,
    // },
  },
};
