module.exports = {
  /**Declaration of databases for my development environment**/
  "development": {
    "databases": {}
  },
  // Special environment only for Database1
  "Database1": {
    "database": process.env.RDS_DATABASE1, //you should always save these values in environment variables
    "username": process.env.RDS_USERNAME1,  //only for testing purposes you can also define the values here
    "password":  process.env.RDS_PASSWORD1,
    "host": process.env.RDS_HOSTNAME1,
    "port": process.env.RDS_PORT1,
    "dialect": "postgres"  //here you need to define the dialect of your databse, in my case it is Postgres
  },
  // Special environment only for Database2
  "Database2": {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  },
    
}

