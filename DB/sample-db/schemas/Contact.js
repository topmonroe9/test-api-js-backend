const { Schema } = require("mongoose");
const { CUSTOM_TIMESTAMPS } = require("../../DB.constant");

module.exports = new Schema(
  {
    lastname: String,
    firstname: String,
    patronymic: String,
    phone: String,
    email: String
  },
  { timestamps: CUSTOM_TIMESTAMPS }
);