const VALIDATOR_MESSAGE = {
  EXISTS: 'The field does not exist',
  NOT_EMPTY: 'The value cannot be empty',
  IS_EMAIL: 'Invalid email address',
  IS_STRING: 'The value is not a string',
  IS_JWT: 'The value is not a JWT',
  IS_UUID: (version) => `The value is not a UUID v${version}`,
};

module.exports = {
  VALIDATOR_MESSAGE,
};
