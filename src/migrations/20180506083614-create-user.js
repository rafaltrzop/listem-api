module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      emailVerificationHash: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        validate: {
          notEmpty: true,
        },
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
