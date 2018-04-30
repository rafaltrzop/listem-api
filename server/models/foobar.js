'use strict';
module.exports = (sequelize, DataTypes) => {
  var Foobar = sequelize.define('Foobar', {
    loremIpsum: DataTypes.STRING,
    dolorSit: DataTypes.INTEGER
  }, {});
  Foobar.associate = function(models) {
    // associations can be defined here
  };
  return Foobar;
};