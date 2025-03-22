const { sampleDB } = require("../../services/database.service");

function connectionFactory() {
  const { connection } = sampleDB;

  // For tests - create a mock connection if real one doesn't exist
  if (!connection) {
    console.log("Using mock DB connection for tests");
    return {
      models: {
        User: {},
        Company: {},
        Contact: {},
      },
    };
  }

  // If connection exists, define models
  connection.model("User", require("./schemas/User"), "users");
  connection.model("Company", require("./schemas/Company"), "companies");
  connection.model("Contact", require("./schemas/Contact"), "contacts");

  return connection;
}
module.exports = connectionFactory;
