const sequelize = require('../config/db');
const User = require('./users.model');
const Category = require('./catagory.model');
const Service = require('./service.model');
const ServicePriceOption = require('./priceOption.model');

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB is connected successfully');
        await sequelize.sync({ alter: true });
        console.log('Model syncing is done');
    } catch (error) {
        console.error('Something went wrong with DB : ', error.message);
    }
};

module.exports = {
    connectDB,
    User,
    Category,
    Service,
    ServicePriceOption
}