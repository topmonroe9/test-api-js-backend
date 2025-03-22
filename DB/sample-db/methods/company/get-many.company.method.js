const connection = require("../../index");

/**
 * Returns a list of companies based on the specified filters, sort, and pagination.
 * @param {Object} filter - Filter criteria
 * @param {Object} sort - Sort criteria
 * @param {Object} pagination - Pagination options
 * @return {Promise<Object>}
 */
async function getMany(filter = {}, sort = {}, pagination = {}) {
  const { Company } = connection().models;

  let query = Company.find();

  if (filter.status) {
    query = query.where("status").equals(filter.status);
  }
  if (filter.type) {
    query = query.where("type").in(filter.type);
  }

  const total = await Company.countDocuments(query.getFilter());

  if (sort.name) {
    query = query.sort({ name: sort.name === "asc" ? 1 : -1 });
  }
  if (sort.createdAt) {
    query = query.sort({ createdAt: sort.createdAt === "asc" ? 1 : -1 });
  }

  const limit = pagination.limit || 10;
  const page = pagination.page || 1;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const companies = await query.exec();

  return {
    data: companies,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
}

module.exports = { getMany };
