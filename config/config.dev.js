// config/config.dev.js
const config = require("./config.global");

config.jwt.secretKey = "jwt-secretKey";
config.jwt.verify.maxAge = 604800;

config.dbs.sample_db.uri = "mongodb://localhost:27017";
config.dbs.sample_db.database = "company-api";

module.exports = config;
