const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';

//Load the configuration from the config.js
const dbConfig = require("../config/db.config.js")[env];

//Create an empty object which can store our databases
const db = {};

//Extract the database information into an array
const databases = Object.keys(dbConfig.databases);

//Loop over the array and create a new Sequelize instance for every database from config.js
for(let i = 0; i < databases.length; ++i) {
  let database = databases[i];
  let dbPath = dbConfig.databases[database];
  //Store the database connection in our db object
  db[database] = new Sequelize(dbPath.DB, dbPath.USER, dbPath.PASSWORD, {
    host: dbPath.HOST,
    dialect: dbPath.dialect,
    port: dbPath.port,
    operatorsAliases: false,
    
    pool: {
      max: dbPath.pool.max,
      min: dbPath.pool.min,
      acquire: dbPath.pool.acquire,
      idle: dbPath.pool.idle
    }
  });  
}

/**Add the Database Models**/
//Add models from database1 folder
fs
  .readdirSync(__dirname + '/database1')
  .filter(file =>
      (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js'))
  .forEach(file => {
      const model = db.Database1.import(path.join(__dirname + '/database1', file));
      db[model.name] = model;
  });

// Add models from database2 folder

fs
  .readdirSync(__dirname + '/database2')
  .filter(file =>
      (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js'))
  .forEach(file => {
      const model = db.Database2.import(path.join(__dirname + '/database2', file));
      db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
      db[modelName].associate(db);
  }
});

module.exports = db;
