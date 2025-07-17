const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
    config.db_name,
    config.db_user,
    config.db_password,
    {
        host: config.db_host,
        port: config.db_port,
        dialect: 'mysql',
        logging: true,
    }
);

module.exports = sequelize;