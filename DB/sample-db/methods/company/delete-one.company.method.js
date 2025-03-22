const connection = require("../../index");
const { getOne } = require("./get-one.company.method");

/**
 * Deletes a company with the specified ID.
 * @param {string} id
 * @return {Promise<Object>}
 */
async function deleteOne(id) {
  const { Company } = connection().models;
  await getOne(id);

  return Company.findByIdAndDelete(id);
}

module.exports = { deleteOne };
