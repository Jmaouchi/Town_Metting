const Sequelize = require('sequelize');
// to be able to get the hidden data from the .env file 
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // connect to the JAWSDB if it exists 
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  // if not connect to the local database
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;
