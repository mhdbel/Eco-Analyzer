const { Sequelize } = require('sequelize');
const logger = require('./logger');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
    evict: 10000
  },
  logging: (msg) => logger.debug(msg)
});

module.exports = sequelize;