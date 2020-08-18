const { body } = require('express-validator');
const PasswordValidator = require('password-validator');

const { VALIDATOR_MESSAGE } = require('../../utils/validation');

module.exports = {
  createUser(req, res) {
    res.status(201).json();
  },

  createUserRequest() {
    return [
      body('email')
        .exists()
        .withMessage(VALIDATOR_MESSAGE.EXISTS)
        .isString()
        .withMessage(VALIDATOR_MESSAGE.IS_STRING)
        .trim()
        .notEmpty()
        .withMessage(VALIDATOR_MESSAGE.NOT_EMPTY)
        .isEmail()
        .withMessage(VALIDATOR_MESSAGE.IS_EMAIL)
        .normalizeEmail(),
      body('password')
        .exists()
        .withMessage(VALIDATOR_MESSAGE.EXISTS)
        .isString()
        .withMessage(VALIDATOR_MESSAGE.IS_STRING)
        .notEmpty()
        .withMessage(VALIDATOR_MESSAGE.NOT_EMPTY)
        .custom((password) => {
          const passwordSchema = new PasswordValidator();
          passwordSchema
            .is()
            .min(8)
            .is()
            .max(40)
            .has()
            .uppercase()
            .has()
            .lowercase()
            .has()
            .digits()
            .has()
            .symbols();

          const failedPasswordRules = passwordSchema.validate(password, {
            list: true,
          });
          if (failedPasswordRules.length) {
            const failedRules = failedPasswordRules.join(', ');
            throw new Error(
              `Invalid password format (failed rules: ${failedRules})`
            );
          }

          return true;
        }),
    ];
  },
};
