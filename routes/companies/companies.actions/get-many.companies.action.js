const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company");
const { parseMany } = require("../companies.service");
const { getUrlForRequest } = require("../../../helpers/url.helper");

/**
 * GET /companies
 * Endpoint for getting a list of companies.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getMany(req, res) {
  logger.init("get companies list");
  
  // Parse query parameters
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.type) {
    filter.type = req.query.type;
  }
  
  const sort = {};
  if (req.query.sort_by === "name") {
    sort.name = req.query.sort_order || "asc";
  }
  if (req.query.sort_by === "createdAt") {
    sort.createdAt = req.query.sort_order || "asc";
  }
  
  const pagination = {
    page: parseInt(req.query.page, 10) || 1,
    limit: parseInt(req.query.limit, 10) || 10
  };
  
  const result = await companyMethods.getMany(filter, sort, pagination);
  
  const photoUrl = getUrlForRequest(req);
  
  res.header("X-Total-Count", result.pagination.total);
  res.status(OK).json({
    data: parseMany(result.data, photoUrl),
    pagination: result.pagination
  });
  logger.success();
}

module.exports = { getMany };