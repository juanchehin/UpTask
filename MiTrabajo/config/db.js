const Sequelize = require('sequelize');

const db = new Sequelize('uptasknode', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorsAliases: 0,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
});

module.exports = db;