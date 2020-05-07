const { Op } = require('sequelize');
require('dotenv').config();

const { Token } = require('../models');

const refreshTokenLifetime = new Date(
  new Date() - process.env.REFRESH_TOKEN_LIFETIME_DAYS * 24 * 60 * 60 * 1000,
);
Token.destroy({
  where: {
    createdAt: {
      [Op.lt]: refreshTokenLifetime,
    },
  },
});
