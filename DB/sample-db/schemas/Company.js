const { Schema } = require("mongoose");
const { CUSTOM_TIMESTAMPS } = require("../../DB.constant");

module.exports = new Schema(
  {
    contactId: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
    },
    name: String,
    shortName: String,
    businessEntity: String,
    contract: {
      no: String,
      issue_date: Date,
    },
    type: [String],
    status: String,
    address: String,
    photos: [
      {
        name: String,
        filepath: String,
        thumbpath: String,
      },
    ],
  },
  { timestamps: CUSTOM_TIMESTAMPS }
);
