const { body } = require('express-validator');
const PasswordValidator = require('password-validator');

const { VALIDATOR_MESSAGE } = require('../utils/validation');

module.exports = (models) => ({
  // TODO
  index(req, res) {
    // const User = models.User;
    //
    // User.findAll().then(users => {
    //   console.log(users);
    // });

    res.json({
      data: 'index user',
    });
  },

  createUser(req, res) {
    // TODO: use valid JSON API response, send back only some fields? no password (hash)?
    // TODO: add location header
    // https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.30
    // https://docs.microsoft.com/pl-pl/azure/architecture/best-practices/api-design#post-methods
    res.status(201).json({
      data: {
        user: req.user,
      },
    });
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

          const failedPasswordRules = passwordSchema.validate(password, { list: true });
          if (failedPasswordRules.length) {
            const failedRules = failedPasswordRules.join(', ');
            throw new Error(`Invalid password format (failed rules: ${failedRules})`);
          }

          return true;
        }),
    ];
  },

  // TODO
  show(req, res) {
    res.json({
      data: 'show user',
    });
  },

  // TODO
  update(req, res) {
    res.json({
      data: 'update user',
    });
  },

  // TODO
  destroy(req, res) {
    res.json({
      data: 'destroy user',
    });
  },
});
