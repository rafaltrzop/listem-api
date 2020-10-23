const { Op } = require('sequelize');
require('dotenv').config();

const { RefreshToken } = require('../models');

async function deleteExpiredRefreshTokens() {
  const expiryDate = new Date(
    Date.now() - process.env.REFRESH_TOKEN_LIFETIME_DAYS * 24 * 60 * 60 * 1000
  );

  await RefreshToken.destroy({
    where: {
      createdAt: {
        [Op.lt]: expiryDate,
      },
    },
  });
}

deleteExpiredRefreshTokens();

module.exports = {
  deleteExpiredRefreshTokens,
};
