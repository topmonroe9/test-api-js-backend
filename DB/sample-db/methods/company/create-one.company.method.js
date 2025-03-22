const connection = require("../../index");

/**
 * Creates a new company with the specified data and returns the result.
 * @param {Object} data
 * @return {Promise<Object>}
 */
async function createOne(data) {
  const { Company } = connection().models;
  const company = new Company(data);
  return company.save();
}

module.exports = { createOne };
