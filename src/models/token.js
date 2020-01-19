'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    userId: DataTypes.INTEGER,
    refreshToken: DataTypes.STRING
  }, {});
  Token.associate = function(models) {
    // associations can be defined here
  };
  return Token;
};