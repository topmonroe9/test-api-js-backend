const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const contactMethods = require("../../../DB/sample-db/methods/contact");

/**
 * DELETE /contacts/:id
 * Endpoint for deleting a contact.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function deleteOne(req, res) {
  logger.init("delete contact");
  const { id } = req.params;

  await contactMethods.deleteOne(id);

  res.status(OK).json({ message: "Contact deleted successfully" });
  logger.success();
}

module.exports = { deleteOne };
