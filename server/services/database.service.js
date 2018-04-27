const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: 'postgres',
    username: 'postgres',
    password: 'postgres',

    host: 'localhost',
    port: 5432,

    dialect: 'postgres',

    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = sequelize;