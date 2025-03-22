const connection = require("../../index");
const { getOne } = require("./get-one.company.method");

/**
 * Редактирует данные компании с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Promise<Object>}
 */
async function editOne(id, data) {
  const { Company } = connection().models;
  await getOne(id);

  return Company.findByIdAndUpdate(id, data, { new: true });
}

module.exports = { editOne };
