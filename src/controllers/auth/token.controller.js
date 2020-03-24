const { body } = require('express-validator');

const { VALIDATOR_MESSAGE } = require('../../utils/validation');

module.exports = (models) => ({
  refreshAccessToken(req, res) {
    // TODO: remove
    console.log('#####################');
    console.log(req.body);
    console.log('#####################');

    res.json({
      data: 'index token refresh',
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
});
