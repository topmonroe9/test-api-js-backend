// jest.setup.js
const mongoose = require("mongoose");
const { sampleDB } = require("./services/database.service");
const config = require("./config");

beforeAll(async () => {
  try {
    await sampleDB.connect();
    console.log("Connected to test database");
  } catch (error) {
    console.error("Error connecting to test database:", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    const { collections } = mongoose.connection;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }

    await sampleDB.disconnect();
    console.log("Disconnected from test database");
  } catch (error) {
    console.error("Error disconnecting from test database:", error);
  }
});
