const Sequelize = require('sequelize');
const sequelize = require('../services/database.service');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

module.exports = User;
