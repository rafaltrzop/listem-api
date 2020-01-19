module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      refreshToken: {
        allowNull: false,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          notEmpty: true,
          isUUID: 4,
        },
      },
    },
    {},
  );

  Token.associate = (models) => {
    Token.belongsTo(models.User);
  };

  return Token;
};
