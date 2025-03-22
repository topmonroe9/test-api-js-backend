const { Schema } = require("mongoose");
const { CUSTOM_TIMESTAMPS } = require("../../DB.constant");

module.exports = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: CUSTOM_TIMESTAMPS }
);