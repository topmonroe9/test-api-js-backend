const connection = require("../../index");

/**
 * Creates a new contact with the specified data and returns the result.
 * @param {Object} data
 * @return {Promise<Object>}
 */
async function createOne(data) {
  const { Contact } = connection().models;
  const contact = new Contact(data);
  return contact.save();
}

module.exports = { createOne };