const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./catagory.model');
const { v4: uuidv4 } = require('uuid');

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('Normal', 'VIP'),
        allowNull: false,
    }
}, {
    tableName: 'services',
    timestamps: true,
});

// FK Relationship
Category.hasMany(Service, {
    foreignKey: 'categoryId',
    onDelete: 'CASCADE',
});
Service.belongsTo(Category, {
    foreignKey: 'categoryId',
});

module.exports = Service;
