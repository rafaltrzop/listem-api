module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      userId: DataTypes.INTEGER,
      refreshToken: DataTypes.STRING,
    },
    {},
  );

  // TODO
  // associations can be defined here
  // Token.associate = (models) => {
  // };

  return Token;
};
