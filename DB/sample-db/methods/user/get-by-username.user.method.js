const connection = require("../../index");

/**
 * Returns a user with the specified username.
 * @param {string} username
 * @return {Promise<Object|null>}
 */
async function getByUsername(username) {
  const { User } = connection().models;
  return User.findOne({ username });
}

module.exports = { getByUsername };
