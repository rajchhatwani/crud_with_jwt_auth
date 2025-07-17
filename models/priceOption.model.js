const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Service = require('./service.model');
const { v4: uuidv4 } = require('uuid');

const ServicePriceOption = sequelize.define('ServicePriceOption', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
        allowNull: false,
    },
}, {
    tableName: 'service_price_options',
    timestamps: true,
});

// FK Relationship
Service.hasMany(ServicePriceOption, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
});
ServicePriceOption.belongsTo(Service, {
    foreignKey: 'serviceId',
});

module.exports = ServicePriceOption;
