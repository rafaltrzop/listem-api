require('dotenv').config();

const models = require('../../models');

const { sequelize } = models;

module.exports = () => {
  sequelize.sync({ force: true, match: new RegExp(process.env.TEST_DB_NAME) });
};
