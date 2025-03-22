const connection = require("../../index");
const { getOne } = require("./get-one.contact.method");

/**
 * Deletes a contact with the specified ID.
 * @param {string} id
 * @return {Promise<Object>}
 */
async function deleteOne(id) {
  const { Contact } = connection().models;
  await getOne(id);

  return Contact.findByIdAndDelete(id);
}

module.exports = { deleteOne };
