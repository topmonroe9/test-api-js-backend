const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../../../../app");
const v = require("../../../../config").prefix;
const httpCodes = require("../../../../constants/http-codes");
const { Unauthorized, NotFound } = require("../../../../constants/errors");

jest.mock("../../../../middleware/request-auth.middleware", () => ({
  isAuthorized: jest.fn(),
}));

jest.mock("../../../../DB/sample-db/methods/contact", () => ({
  getOne: jest.fn(),
  editOne: jest.fn(),
}));

const requestAuth = require("../../../../middleware/request-auth.middleware");
const contactMethods = require("../../../../DB/sample-db/methods/contact");

const requestBody = {
  lastname: "Grimes",
  firstname: "Rick",
};

const mockContact = {
  _id: new mongoose.Types.ObjectId().toString(),
  firstname: "Сергей",
  lastname: "Григорьев",
  patronymic: "Петрович",
  phone: "79162165588",
  email: "grigoriev@funeral.com",
  createdAt: new Date("2020-11-21T08:03:26.589Z").toISOString(),
  updatedAt: new Date("2020-11-23T09:30:00Z").toISOString(),
  toObject() {
    return {
      _id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      patronymic: this.patronymic,
      phone: this.phone,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

describe("testing PATCH /contacts/:id", () => {
  beforeAll(() => {
    requestAuth.isAuthorized.mockImplementation((req, res, next) => {
      req.payload = { id: "60472125addc158c1ec2b1cf" };
      next();
    });

    contactMethods.getOne.mockImplementation(async (id) => {
      // Throw on invalid format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new NotFound("Contact not found");
        throw error;
      }

      if (id !== mockContact._id) {
        const error = new NotFound("Contact not found");
        throw error;
      }

      return mockContact;
    });

    contactMethods.editOne.mockImplementation(async (id, data) => {
      await contactMethods.getOne(id);

      const updated = {
        ...mockContact,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      updated.toObject = function () {
        return {
          _id: this._id,
          firstname: this.firstname,
          lastname: this.lastname,
          patronymic: this.patronymic,
          phone: this.phone,
          email: this.email,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
        };
      };

      return updated;
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("with authorization", () => {
    beforeAll(() => {
      requestAuth.isAuthorized.mockImplementation((req, res, next) => next());
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    test("error: 422 invalid id format", async () => {
      const { status, body } = await request(app)
        .patch(`/${v}/contacts/abc`)
        .send(requestBody);

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "id: parameter has incorrect format",
      });
    });

    test("error: 404 contact not found for non-existent id", async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();

      const { status, body } = await request(app)
        .patch(`/${v}/contacts/${nonExistentId}`)
        .send(requestBody);

      expect(status).toBe(httpCodes.NOT_FOUND);
      expect(body).toEqual({
        code: "NOT_FOUND",
        message: "Contact not found",
      });
    });

    test("error: 500 internal server error", async () => {
      contactMethods.getOne.mockImplementationOnce(() => {
        throw new Error("Test error");
      });

      const { status, body } = await request(app)
        .patch(`/${v}/contacts/${mockContact._id}`)
        .send(requestBody);

      expect(status).toBe(httpCodes.INTERNAL_ERROR);
      expect(body).toEqual({
        code: "INTERNAL_ERROR",
        message: "Internal unexpected server error",
      });
    });

    test("success", async () => {
      const { status, body } = await request(app)
        .patch(`/${v}/contacts/${mockContact._id}`)
        .send(requestBody);

      expect(status).toEqual(httpCodes.OK);

      expect(body.firstname).toEqual(requestBody.firstname);
      expect(body.lastname).toEqual(requestBody.lastname);

      expect(body.patronymic).toEqual(mockContact.patronymic);
      expect(body.phone).toEqual(mockContact.phone);
      expect(body.email).toEqual(mockContact.email);
    });
  });

  describe("without authorization", () => {
    beforeAll(() => {
      requestAuth.isAuthorized.mockImplementation((req, res, next) =>
        next(new Unauthorized())
      );
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    test("error: 401 unauthorized", async () => {
      const { status, body } = await request(app)
        .patch(`/${v}/contacts/${mockContact._id}`)
        .send(requestBody);

      expect(status).toBe(httpCodes.UNAUTHORIZED);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        message: "Unauthorized request",
      });
    });
  });
});
