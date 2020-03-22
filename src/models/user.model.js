const bcrypt = require('bcrypt');

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
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      hooks: {
        async beforeCreate(user) {
          const saltRounds = 12;
          // eslint-disable-next-line no-param-reassign
          user.password = await bcrypt.hash(user.password, saltRounds);
        },
      },
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Token);
  };

  User.prototype.isValidPassword = async function isValidPassword(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };

  return User;
};
