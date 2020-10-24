const { body } = require('express-validator');
const PasswordValidator = require('password-validator');
const sgMail = require('@sendgrid/mail');

const { VALIDATOR_MESSAGE } = require('../../utils/validation');

module.exports = {
  async createUser(req, res) {
    const { user } = req;

    if (user.created) {
      const accountActivationMail = {
        from: {
          name: process.env.SENDGRID_FROM_NAME,
          email: process.env.SENDGRID_FROM_EMAIL,
        },
        to: user.email,
        subject: 'Account activation',
        html: `
            <h1>Hello</h1>
            <p>Thank you for your registration. Please click on the link below to activate your account.</p>
            <a href="${process.env.PROTOCOL}://${process.env.HOST}/api/auth/${user.emailVerification}">
                Activate account
            </a>
        `,
      };

      try {
        await sgMail.send(accountActivationMail);
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    }

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
