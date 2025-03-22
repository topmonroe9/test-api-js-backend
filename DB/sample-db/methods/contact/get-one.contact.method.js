// DB/sample-db/methods/contact/get-one.contact.method.js
const mongoose = require("mongoose");
const connection = require("../../index");
const { NotFound } = require("../../../../constants/errors");

/**
 * Возвращает данные контакта с указанным идентификатором.
 * @param {string} id
 * @return {Promise<Object|null>}
 */
async function getOne(id) {
  // Check is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFound("Contact not found");
  }

  const { Contact } = connection().models;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new NotFound("Contact not found");
  }

  return contact;
}

module.exports = { getOne };
