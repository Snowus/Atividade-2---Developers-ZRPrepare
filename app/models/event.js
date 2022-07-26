const Sequelize = require('sequelize');
const db = require('./index');

const Event = db.define('Event', {
	title: {
		type: Sequelize.STRING,
	},
	description: {
		type: Sequelize.STRING,
	},
	data: {
		type: Sequelize.DATEONLY,
	},
	startAt: {
		type: Sequelize.TIME,
	},
	endAt: {
		type: Sequelize.TIME,
	},
	local: {
		type: Sequelize.STRING,
	},
	color: {
		type: Sequelize.STRING,
	},
	calendarID: {
		type: Sequelize.STRING,
	},
	published: {
		type: Sequelize.BOOLEAN,
	},
});

module.exports = Event;
