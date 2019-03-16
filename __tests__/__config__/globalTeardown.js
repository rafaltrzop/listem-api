const models = require('../../src/models');

const { sequelize } = models;

module.exports = async () => {
  await sequelize.close();
};
