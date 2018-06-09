const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      async beforeCreate(user) {
        const saltRounds = 12;
        user.password = await bcrypt.hash(user.password, saltRounds);
      }
    }
  });

  // TODO
  // associations can be defined below
  // User.associate = (models) => {
  // };

  User.prototype.isValidPassword = async function(password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
  };

  return User;
};
