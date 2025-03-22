const {
  OK,
  CREATED,
  UNAUTHORIZED,
  NOT_FOUND,
  UNPROCESSABLE_ENTITY,
} = require("../../../constants/http-codes");
const {
  unauthorized,
  notFound,
  unprocessableEntity,
} = require("../../../config/swagger/common-errors");

module.exports = {
  "/contacts": {
    post: {
      summary: "Create contact",
      description: "Creates a new contact",
      tags: ["Contacts"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["firstname", "lastname"],
              properties: {
                firstname: {
                  type: "string",
                  description: "Contact's first name",
                },
                lastname: {
                  type: "string",
                  description: "Contact's last name",
                },
                patronymic: {
                  type: "string",
                  description: "Contact's patronymic",
                },
                phone: {
                  type: "string",
                  description: "Contact's phone number",
                },
                email: {
                  type: "string",
                  description: "Contact's email address",
                },
              },
            },
          },
        },
      },
      responses: {
        [CREATED]: {
          description: "Contact created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "Contact ID",
                  },
                  firstname: {
                    type: "string",
                    description: "Contact's first name",
                  },
                  lastname: {
                    type: "string",
                    description: "Contact's last name",
                  },
                  patronymic: {
                    type: "string",
                    description: "Contact's patronymic",
                  },
                  phone: {
                    type: "string",
                    description: "Contact's phone number",
                  },
                  email: {
                    type: "string",
                    description: "Contact's email address",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    description: "Creation date",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    description: "Last update date",
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
  "/contacts/{id}": {
    get: {
      summary: "Get contact",
      description: "Returns contact details by ID",
      tags: ["Contacts"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "Contact ID",
        },
      ],
      responses: {
        [OK]: {
          description: "Contact details",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "Contact ID",
                  },
                  firstname: {
                    type: "string",
                    description: "Contact's first name",
                  },
                  lastname: {
                    type: "string",
                    description: "Contact's last name",
                  },
                  patronymic: {
                    type: "string",
                    description: "Contact's patronymic",
                  },
                  phone: {
                    type: "string",
                    description: "Contact's phone number",
                  },
                  email: {
                    type: "string",
                    description: "Contact's email address",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    description: "Creation date",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    description: "Last update date",
                  },
                },
              },
            },
          },
        },
        [UNAUTHORIZED]: unauthorized,
        [NOT_FOUND]: notFound,
      },
    },
    patch: {
      summary: "Update contact",
      description: "Updates contact details",
      tags: ["Contacts"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "Contact ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstname: {
                  type: "string",
                  description: "Contact's first name",
                },
                lastname: {
                  type: "string",
                  description: "Contact's last name",
                },
                patronymic: {
                  type: "string",
                  description: "Contact's patronymic",
                },
                phone: {
                  type: "string",
                  description: "Contact's phone number",
                },
                email: {
                  type: "string",
                  description: "Contact's email address",
                },
              },
            },
          },
        },
      },
      responses: {
        [OK]: {
          description: "Contact updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "Contact ID",
                  },
                  firstname: {
                    type: "string",
                    description: "Contact's first name",
                  },
                  // ... other fields
                },
              },
            },
          },
        },
        [UNAUTHORIZED]: unauthorized,
        [NOT_FOUND]: notFound,
        [UNPROCESSABLE_ENTITY]: unprocessableEntity,
      },
    },
    delete: {
      summary: "Delete contact",
      description: "Deletes a contact by ID",
      tags: ["Contacts"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "Contact ID",
        },
      ],
      responses: {
        [OK]: {
          description: "Contact deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Contact deleted successfully",
                  },
                },
              },
            },
          },
        },
        [UNAUTHORIZED]: unauthorized,
        [NOT_FOUND]: notFound,
      },
    },
  },
};
