const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      refreshToken: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      hooks: {
        async beforeSave(token) {
          // eslint-disable-next-line no-param-reassign
          token.refreshToken = crypto
            .createHash('sha256')
            .update(token.refreshToken)
            .digest('hex');
        },
      },
    },
  );

  Token.associate = (models) => {
    Token.belongsTo(models.User, { onDelete: 'CASCADE' });
  };

  return Token;
};
