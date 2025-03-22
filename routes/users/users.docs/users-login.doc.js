const {
  OK,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} = require("../../../constants/http-codes");
const {
  unauthorized,
  unprocessableEntity,
} = require("../../../config/swagger/common-errors");

module.exports = {
  "/users/login": {
    post: {
      summary: "User login",
      description: "Authenticates a user and returns an access token",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["username", "password"],
              properties: {
                username: {
                  type: "string",
                  description: "User's username",
                  example: "admin",
                },
                password: {
                  type: "string",
                  description: "User's password",
                  example: "password123",
                },
              },
            },
          },
        },
      },
      responses: {
        [OK]: {
          description: "User successfully authenticated",
          headers: {
            Authorization: {
              schema: {
                type: "string",
              },
              description: "Bearer authorization token",
            },
          },
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    description: "User identifier",
                    example: "60472125addc158c1ec2b1cf",
                  },
                  username: {
                    type: "string",
                    description: "User's username",
                    example: "admin",
                  },
                },
              },
            },
          },
        },
        [UNAUTHORIZED]: unauthorized,
        [UNPROCESSABLE_ENTITY]: unprocessableEntity,
      },
    },
  },
};
