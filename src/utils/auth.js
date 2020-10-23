const jwt = require('jsonwebtoken');

const { RefreshToken } = require('../models');

function generateAccessToken(payload) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const options = {
    expiresIn: `${process.env.ACCESS_TOKEN_LIFETIME_MINS}m`,
  };
  const accessToken = jwt.sign(payload, secret, options);

  return accessToken;
}

async function generateRefreshToken(userId) {
  const token = RefreshToken.build({ userId });
  const { refreshTokenHash: refreshToken } = token;
  await token.save();

  return refreshToken;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
