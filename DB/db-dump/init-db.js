/**
 * MongoDB initialization script for company-api
 * Run with: mongosh mongodb://localhost:27017/company-api init-db.js
 */

// Clear existing collections
print("Dropping existing collections...");
db.users.drop();
db.companies.drop();
db.contacts.drop();

print("Creating users collection...");
// Create admin user
// In a real application, passwords would be hashed through the application
// For testing purposes, we're using plain text
db.users.insertOne({
  username: "admin",
  password: "admin123",
  createdAt: new Date(),
  updatedAt: new Date(),
});

print("Creating contacts collection...");
// Create sample contacts
const contact1 = db.contacts.insertOne({
  firstname: "Сергей",
  lastname: "Григорьев",
  patronymic: "Петрович",
  phone: "79162165588",
  email: "grigoriev@funeral.com",
  createdAt: new Date("2020-11-21T08:03:26.589Z"),
  updatedAt: new Date("2020-11-23T09:30:00Z"),
});

const contact2 = db.contacts.insertOne({
  firstname: "Иван",
  lastname: "Иванов",
  patronymic: "Иванович",
  phone: "79162165599",
  email: "ivanov@example.com",
  createdAt: new Date("2021-03-15T10:20:30.000Z"),
  updatedAt: new Date("2021-04-10T14:25:00.000Z"),
});

const contact3 = db.contacts.insertOne({
  firstname: "Анна",
  lastname: "Смирнова",
  patronymic: "Владимировна",
  phone: "79261234567",
  email: "smirnova@example.com",
  createdAt: new Date("2021-05-20T09:15:00.000Z"),
  updatedAt: new Date("2021-05-20T09:15:00.000Z"),
});

print("Creating companies collection...");
// Create sample companies
db.companies.insertOne({
  contactId: contact1.insertedId,
  name: "ООО Фирма «Перспективные захоронения»",
  shortName: "Перспективные захоронения",
  businessEntity: "ООО",
  address: "г. Москва, ул. Ленина, д. 10",
  contract: {
    no: "12345",
    issue_date: new Date("2015-03-12T00:00:00Z"),
  },
  type: ["agent", "contractor"],
  status: "active",
  photos: [
    {
      name: "0b8fc462dcabf7610a91.png",
      filepath: "0b8fc462dcabf7610a91.png",
      thumbpath: "0b8fc462dcabf7610a91_160x160.png",
    },
  ],
  createdAt: new Date("2020-11-21T08:03:00Z"),
  updatedAt: new Date("2020-11-23T09:30:00Z"),
});

db.companies.insertOne({
  contactId: contact2.insertedId,
  name: "ЗАО «Строительная компания»",
  shortName: "СтройКом",
  businessEntity: "ЗАО",
  address: "г. Санкт-Петербург, пр. Невский, д. 1",
  contract: {
    no: "54321",
    issue_date: new Date("2018-05-15T00:00:00Z"),
  },
  type: ["contractor"],
  status: "active",
  photos: [],
  createdAt: new Date("2021-03-15T10:25:00.000Z"),
  updatedAt: new Date("2021-03-15T10:25:00.000Z"),
});

db.companies.insertOne({
  contactId: contact3.insertedId,
  name: "ИП Сидоров А.В.",
  shortName: "ИП Сидоров",
  businessEntity: "ИП",
  address: "г. Казань, ул. Пушкина, д. 5, офис 10",
  contract: {
    no: "98765",
    issue_date: new Date("2020-10-01T00:00:00Z"),
  },
  type: ["agent"],
  status: "inactive",
  photos: [],
  createdAt: new Date("2021-05-20T11:30:00.000Z"),
  updatedAt: new Date("2022-01-15T14:45:00.000Z"),
});

print("Creating indexes...");
// Create indexes for better performance
db.users.createIndex({ username: 1 }, { unique: true });
db.companies.createIndex({ status: 1 });
db.companies.createIndex({ type: 1 });
db.companies.createIndex({ name: 1 });
db.companies.createIndex({ createdAt: 1 });
db.companies.createIndex({ contactId: 1 });
db.contacts.createIndex({ email: 1 });
db.contacts.createIndex({ phone: 1 });

print("\n=== Database initialization completed successfully! ===");
print("\nSample data created:");
print("- 1 user (admin/admin123)");
print("- 3 contacts");
print("- 3 companies");
print("\nYou can now use the API with these sample entities.\n");
