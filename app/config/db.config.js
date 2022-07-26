require('dotenv').config();

const defaultConfig = {
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

module.exports = {
	development: {
		DB: process.env.DB_NAME,
		...defaultConfig,
	},
	test: {
		dialect: 'sqlite',
	},
};
