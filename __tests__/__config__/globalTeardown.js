const models = require('../../models');

const { sequelize } = models;

module.exports = async () => {
  await sequelize.close();
};
