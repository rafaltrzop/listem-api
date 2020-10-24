const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      passwordHash: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      emailVerificationHash: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          notEmpty: true,
        },
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        async beforeCreate(user) {
          const saltRounds = 12;
          // eslint-disable-next-line no-param-reassign
          user.passwordHash = await bcrypt.hash(user.passwordHash, saltRounds);

          // eslint-disable-next-line no-param-reassign
          user.emailVerificationHash = crypto
            .createHash('sha256')
            .update(user.emailVerificationHash)
            .digest('hex');
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasMany(models.RefreshToken, { foreignKey: 'userId' });
  };

  User.prototype.isValidPassword = async function isValidPassword(password) {
    const user = this;
    return bcrypt.compare(password, user.passwordHash);
  };

  return User;
};
