const connection = require("../../index");
const { NotFound } = require("../../../../constants/errors");

/**
 * Возвращает данные компании с указанным идентификатором.
 * @param {string} id
 * @return {Promise<Object|null>}
 */
async function getOne(id) {
  const { Company } = connection().models;
  const company = await Company.findById(id);
  
  if (!company) {
    throw new NotFound("Company not found");
  }
  
  return company;
}

module.exports = { getOne };
