const config = require("./config.global");

config.log.console = true;
config.log.debug = true;

// MongoDB configuration for testing
config.dbs.sample_db.uri = "mongodb://localhost:27017";
config.dbs.sample_db.database = "company-api-test";

config.jwt.secretKey = "jwt-test-secretKey";
config.jwt.verify.maxAge = 604800;

module.exports = config;
