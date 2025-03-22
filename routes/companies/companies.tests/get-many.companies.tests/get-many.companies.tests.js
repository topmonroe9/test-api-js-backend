const request = require("supertest");
const { app } = require("../../../../app");
const v = require("../../../../config").prefix;
const httpCodes = require("../../../../constants/http-codes");
const companyMethods = require("../../../../DB/sample-db/methods/company");
const requestAuth = require("../../../../middleware/request-auth.middleware");
const JwtService = require("../../../../services/jwt.service");
const jwtConfig = require("../../../../config").jwt;

jest.mock("../../../../DB/sample-db/methods/company");
jest.mock("../../../../middleware/request-auth.middleware");

const token = `Bearer ${
  new JwtService(jwtConfig).encode({
    id: "60472125addc158c1ec2b1cf",
    username: "username",
  }).data
}`;

describe("testing GET /companies", () => {
  beforeAll(async () => {
    requestAuth.isAuthorized.mockImplementation((req, res, next) => {
      req.payload = { id: "60472125addc158c1ec2b1cf" };
      next();
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("success: 200 get companies list", async () => {
    const mockCompanies = [
      {
        _id: "60472125addc158c1ec2b1cf",
        name: "Company 1",
        status: "active",
        type: ["agent"],
        address: "123 Main St",
        photos: [],
        toObject: () => ({
          _id: "60472125addc158c1ec2b1cf",
          name: "Company 1",
          status: "active",
          type: ["agent"],
          address: "123 Main St",
          photos: [],
        }),
      },
      {
        _id: "60472125addc158c1ec2b1cg",
        name: "Company 2",
        status: "inactive",
        type: ["contractor"],
        address: "456 Oak Ave",
        photos: [],
        toObject: () => ({
          _id: "60472125addc158c1ec2b1cg",
          name: "Company 2",
          status: "inactive",
          type: ["contractor"],
          address: "456 Oak Ave",
          photos: [],
        }),
      },
    ];

    jest.spyOn(companyMethods, "getMany").mockImplementationOnce(() =>
      Promise.resolve({
        data: mockCompanies,
        pagination: {
          total: 2,
          page: 1,
          limit: 10,
          pages: 1,
        },
      })
    );

    const { status, body } = await request(app)
      .get(`/${v}/companies`)
      .set("Authorization", token);

    expect(status).toBe(httpCodes.OK);
    expect(body).toEqual({
      data: [
        {
          _id: "60472125addc158c1ec2b1cf",
          name: "Company 1",
          status: "active",
          type: ["agent"],
          address: "123 Main St",
          photos: [],
        },
        {
          _id: "60472125addc158c1ec2b1cg",
          name: "Company 2",
          status: "inactive",
          type: ["contractor"],
          address: "456 Oak Ave",
          photos: [],
        },
      ],
      pagination: {
        total: 2,
        page: 1,
        limit: 10,
        pages: 1,
      },
    });
  });

  test("success: 200 filter by status", async () => {
    const mockCompanies = [
      {
        _id: "60472125addc158c1ec2b1cf",
        name: "Company 1",
        status: "active",
        type: ["agent"],
        address: "123 Main St",
        photos: [],
        toObject: () => ({
          _id: "60472125addc158c1ec2b1cf",
          name: "Company 1",
          status: "active",
          type: ["agent"],
          address: "123 Main St",
          photos: [],
        }),
      },
    ];

    jest.spyOn(companyMethods, "getMany").mockImplementationOnce(() =>
      Promise.resolve({
        data: mockCompanies,
        pagination: {
          total: 1,
          page: 1,
          limit: 10,
          pages: 1,
        },
      })
    );

    const { status, body } = await request(app)
      .get(`/${v}/companies?status=active`)
      .set("Authorization", token);

    expect(status).toBe(httpCodes.OK);
    expect(body.data).toHaveLength(1);
    expect(body.data[0].status).toBe("active");
  });

  test("error: 401 unauthorized access", async () => {
    requestAuth.isAuthorized.mockImplementationOnce((req, res, next) => {
      res.status(httpCodes.UNAUTHORIZED).json({
        code: "UNAUTHORIZED",
        message: "Unauthorized request",
      });
    });

    const { status, body } = await request(app).get(`/${v}/companies`);

    expect(status).toBe(httpCodes.UNAUTHORIZED);
    expect(body).toEqual({
      code: "UNAUTHORIZED",
      message: "Unauthorized request",
    });
  });
});
