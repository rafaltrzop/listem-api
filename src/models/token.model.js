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
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          notEmpty: true,
          isUUID: 4,
        },
      },
    },
    {
      // TODO: hash refresh token, try to use beforeSave hook?
      // hooks: {
      //   async beforeCreate(user) {
      //     const saltRounds = 12;
      //     // eslint-disable-next-line no-param-reassign
      //     user.password = await bcrypt.hash(user.password, saltRounds);
      //   },
      // },
    },
  );

  Token.associate = (models) => {
    Token.belongsTo(models.User, { onDelete: 'CASCADE' });
  };

  return Token;
};
