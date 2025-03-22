const {
  CREATED,
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
} = require("../../../constants/http-codes");
const {
  badRequest,
  unprocessableEntity,
} = require("../../../config/swagger/common-errors");

module.exports = {
  "/users/register": {
    post: {
      summary: "User registration",
      description: "Creates a new user account",
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
        [CREATED]: {
          description: "User successfully created",
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
        [BAD_REQUEST]: badRequest,
        [UNPROCESSABLE_ENTITY]: unprocessableEntity,
      },
    },
  },
};
