// tests/test-utils.js
const bcrypt = require("bcrypt");
const connectionFactory = require("../DB/sample-db/index");

async function seedTestData() {
  const connection = connectionFactory();
  const { User, Company, Contact } = connection.models;

  // Clear existing data
  await User.deleteMany({});
  await Company.deleteMany({});
  await Contact.deleteMany({});

  // Create test user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("test123", salt);

  const user = await User.create({
    username: "testuser",
    password: hashedPassword,
  });

  // Create test contact
  const contact = await Contact.create({
    firstname: "Сергей",
    lastname: "Григорьев",
    patronymic: "Петрович",
    phone: "79162165588",
    email: "grigoriev@funeral.com",
  });

  // Create test company
  const company = await Company.create({
    contactId: contact._id,
    name: "Test Company",
    shortName: "TestCo",
    businessEntity: "ООО",
    address: "Test Address",
    type: ["agent"],
    status: "active",
  });

  return { user, contact, company };
}

module.exports = {
  seedTestData,
};
