const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");

/**
 * PATCH /contacts/:id
 * Эндпоинт редактирования данных контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function editOne(req, res) {
  logger.init("edit contact");
  const { id } = req.params;
  const data = req.body;

  await contactMethods.getOne(id);

  const updated = await contactMethods.editOne(id, data);

  const responseData = updated.toObject ? updated.toObject() : updated;

  res.status(OK).json(responseData);
  logger.success();
}

module.exports = { editOne };
