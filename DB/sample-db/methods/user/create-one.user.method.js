const bcrypt = require("bcrypt");
const connection = require("../../index");

/**
 * Creates a new user with the specified data and returns the result.
 * @param {Object} data
 * @return {Promise<Object>}
 */
async function createOne(data) {
  const { User } = connection().models;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const user = new User({
    username: data.username,
    password: hashedPassword,
  });

  return user.save();
}

module.exports = { createOne };
