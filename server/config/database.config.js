// const fs = require('fs');

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false, // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
  },

  // TODO: CI configuration
  // test: {
  //   username: process.env.CI_DB_USERNAME,
  //   password: process.env.CI_DB_PASSWORD,
  //   database: process.env.CI_DB_NAME,
  //   host: '127.0.0.1',
  //   dialect: 'postgres',
  //   operatorsAliases: false, // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
  // },

  // TODO: production configuration
  // production: {
  //   username: process.env.PROD_DB_USERNAME,
  //   password: process.env.PROD_DB_PASSWORD,
  //   database: process.env.PROD_DB_NAME,
  //   host: process.env.PROD_DB_HOSTNAME,
  //   dialect: 'postgres',
  //   operatorsAliases: false, // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
  //   dialectOptions: {
  //     ssl: {
  //       ca: fs.readFileSync(`${__dirname}/mysql-ca-master.crt`),
  //     },
  //   },
  // },
};
