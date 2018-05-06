module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  // TODO
  User.associate = (models) => {
    // associations can be defined here
  };

  return User;
};
