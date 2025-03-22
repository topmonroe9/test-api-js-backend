const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const companyMethods = require("../../../DB/sample-db/methods/company");

/**
 * DELETE /companies/:id
 * Эндпоинт удаления компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function deleteOne(req, res) {
  logger.init("delete company");
  const { id } = req.params;

  await companyMethods.deleteOne(id);

  res.status(OK).json({ message: "Company deleted successfully" });
  logger.success();
}

module.exports = { deleteOne };
