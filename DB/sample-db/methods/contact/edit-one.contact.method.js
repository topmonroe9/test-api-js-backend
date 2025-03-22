const connection = require("../../index");
const { getOne } = require("./get-one.contact.method");

/**
 * Редактирует данные контакта с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Promise<Object>}
 */
async function editOne(id, data) {
  await getOne(id);

  const { Contact } = connection().models;

  return Contact.findByIdAndUpdate(
    id,
    { ...data, updatedAt: new Date() },
    { new: true }
  );
}

module.exports = { editOne };
