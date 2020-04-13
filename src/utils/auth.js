const jwt = require('jsonwebtoken');

const { Token } = require('../models');

function generateAccessToken(payload) {
  const secret = process.env.JWT_SECRET;
  const options = {
    // TODO: add env?
    expiresIn: '3m',
  };
  const accessToken = jwt.sign(payload, secret, options);

  return accessToken;
}

async function generateRefreshToken(userId) {
  const token = Token.build({ userId });
  const { refreshToken } = token;
  await token.save();

  return refreshToken;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
