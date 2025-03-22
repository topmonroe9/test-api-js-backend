const logger = require("../../../services/logger.service")(module);
const { CREATED } = require("../../../constants/http-codes");
const userMethods = require("../../../DB/sample-db/methods/user");
const { BadRequest } = require("../../../constants/errors");

/**
 * POST /users/register
 * Endpoint for user registration.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function register(req, res) {
  logger.init("user registration");
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = await userMethods.getByUsername(username);
  if (existingUser) {
    throw new BadRequest("Username already exists");
  }

  // Create user
  const user = await userMethods.createOne({ username, password });

  res.status(CREATED).json({
    id: user._id,
    username: user.username
  });
  logger.success();
}

module.exports = { register };