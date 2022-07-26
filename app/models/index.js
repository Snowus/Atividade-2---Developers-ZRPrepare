const env = process.env.NODE_ENV || 'development';

const dbConfig = require('../config/db.config.js')[env];
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	dbConfig.DB,
	dbConfig.USER,
	dbConfig.PASSWORD,
	dbConfig,
);

module.exports = sequelize;
