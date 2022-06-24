const env = process.env.NODE_ENV || "development";

const dbConfig = require("../config/db.config.js")[env];
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  dbConfig
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.events = require("./event.model.js")(sequelize, Sequelize);
console.log(db.events);

module.exports = db;
