const bcrypt = require("bcrypt");
const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const userMethods = require("../../../DB/sample-db/methods/user");
const JwtService = require("../../../services/jwt.service");
const jwtConfig = require("../../../config").jwt;
const { Unauthorized } = require("../../../constants/errors");

/**
 * POST /users/login
 * Endpoint for user login.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function login(req, res) {
  logger.init("user login");
  const { username, password } = req.body;

  // Find user
  const user = await userMethods.getByUsername(username);
  if (!user) {
    throw new Unauthorized("Invalid username or password");
  }

  // Validate password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Unauthorized("Invalid username or password");
  }

  // Generate token
  const token = new JwtService(jwtConfig).encode({
    id: user._id,
    username: user.username
  }).data;

  res.header("Authorization", `Bearer ${token}`);
  logger.success();
  return res.status(OK).json({
    id: user._id,
    username: user.username
  });
}

module.exports = { login };
