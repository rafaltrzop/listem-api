const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    'RefreshToken',
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
        async beforeSave(refreshToken) {
          // eslint-disable-next-line no-param-reassign
          refreshToken.refreshToken = crypto
            .createHash('sha256')
            .update(refreshToken.refreshToken)
            .digest('hex');
        },
      },
    }
  );

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return RefreshToken;
};
