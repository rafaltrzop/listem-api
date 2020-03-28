const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { body } = require('express-validator');

const { VALIDATOR_MESSAGE } = require('../../utils/validation');

module.exports = (models) => ({
  async refreshAccessToken(req, res) {
    const { accessToken, refreshToken } = req.body;
    let payload;

    try {
      const secret = process.env.JWT_SECRET;
      payload = jwt.verify(accessToken, secret, { ignoreExpiration: true });
    } catch (error) {
      // TODO: response status 401?
      return res.status(422).json({
        errors: [
          {
            code: 'INVALID_ACCESS_TOKEN',
            title: 'Invalid signature of access token',
          },
        ],
      });
    }

    // TODO: clean tokens table (remove tokens older than x days)?
    const isValidRefreshToken = await models.Token.destroy({
      where: {
        userId: payload.user.id,
        refreshToken: crypto
          .createHash('sha256')
          .update(refreshToken)
          .digest('hex'),
      },
    });

    // TODO: remove
    console.log('###############');
    console.log(refreshToken);
    console.log(accessToken);
    console.log(payload);
    console.log('deleted rows:', isValidRefreshToken);
    console.log('###############');

    if (isValidRefreshToken) {
      // TODO
      //  - send back new access token and refresh token
      //  - generate and save refresh token in db with user id
      //  - generate new access token with the same payload

      // TODO
      res.json({
        data: {
          accessToken: 'TODO',
          refreshToken: 'TODO',
        },
      });
    } else {
      // TODO: response status 401?
      return res.status(422).json({
        errors: [
          {
            code: 'INVALID_REFRESH_TOKEN',
            title: 'Invalid refresh token',
          },
        ],
      });
    }
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
});
