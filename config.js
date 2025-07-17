require('dotenv').config();

const ENV = process.env.NODE_ENV

const development = {
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    port: process.env.PORT || 5000,
    jwt_secret: process.env.JWT_SECRET || 'secret_fallback',
}

const production = {
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    port: process.env.PORT || 5000,
    jwt_secret: process.env.JWT_SECRET || 'secret_fallback',
}

module.exports = ENV === 'production' ? production : development
