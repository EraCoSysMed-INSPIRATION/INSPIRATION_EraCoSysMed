const fs = require('fs');

const userdb_config = require("../db/config/userdb_config.json");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  userdb_config.development.database,
  userdb_config.development.user,
  userdb_config.development.password,
  {
    host: userdb_config.development.host,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000 
    }
  }
);

const user_db = {};

user_db.Sequelize = Sequelize;
user_db.sequelize = sequelize;

user_db.user = require("../models/usermodels.js")(sequelize, Sequelize);

module.exports = user_db;
