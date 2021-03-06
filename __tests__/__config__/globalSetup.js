require('dotenv').config();

const models = require('../../src/models');

const { sequelize } = models;

module.exports = async () => {
  await sequelize.sync({
    force: true,
    match: new RegExp(process.env.TEST_DB_NAME),
  });
};
