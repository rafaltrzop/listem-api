const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { body } = require('express-validator');

const { Token } = require('../../models');
const { VALIDATOR_MESSAGE } = require('../../utils/validation');
const { generateAccessToken, generateRefreshToken } = require('../../utils/auth');

module.exports = {
  // TODO: set up cron (remove tokens older than n days)
  async refreshAccessToken(req, res) {
    const { accessToken, refreshToken } = req.body;
    let payload;

    try {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      payload = jwt.verify(accessToken, secret, { ignoreExpiration: true });
    } catch (error) {
      return res.status(422).json({
        errors: [
          {
            code: 'INVALID_ACCESS_TOKEN',
            title: 'Invalid signature of access token',
          },
        ],
      });
    }

    const userId = payload.user.id;
    payload = { user: payload.user };
    const isValidRefreshToken = await Token.destroy({
      where: {
        userId,
        refreshToken: crypto
          .createHash('sha256')
          .update(refreshToken)
          .digest('hex'),
      },
    });

    if (isValidRefreshToken) {
      return res.json({
        data: {
          accessToken: generateAccessToken(payload),
          refreshToken: await generateRefreshToken(userId),
        },
      });
    }

    res.status(401).json({
      errors: [
        {
          code: 'INVALID_REFRESH_TOKEN',
          title: 'Invalid refresh token',
        },
      ],
    });
  },

  refreshAccessTokenRequest() {
    return [
      body('accessToken')
        .exists()
        .withMessage(VALIDATOR_MESSAGE.EXISTS)
        .isString()
        .withMessage(VALIDATOR_MESSAGE.IS_STRING)
        .trim()
        .notEmpty()
        .withMessage(VALIDATOR_MESSAGE.NOT_EMPTY)
        .isJWT()
        .withMessage(VALIDATOR_MESSAGE.IS_JWT),
      body('refreshToken')
        .exists()
        .withMessage(VALIDATOR_MESSAGE.EXISTS)
        .isString()
        .withMessage(VALIDATOR_MESSAGE.IS_STRING)
        .trim()
        .notEmpty()
        .withMessage(VALIDATOR_MESSAGE.NOT_EMPTY)
        .isUUID(4)
        .withMessage(VALIDATOR_MESSAGE.IS_UUID(4)),
    ];
  },
};
