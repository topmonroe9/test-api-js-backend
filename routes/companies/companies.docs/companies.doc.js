const {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  UNPROCESSABLE_ENTITY,
} = require("../../../constants/http-codes");
const {
  badRequest,
  unauthorized,
  notFound,
  unprocessableEntity,
} = require("../../../config/swagger/common-errors");

module.exports = {
  "/companies": {
    get: {
      summary: "Get companies list",
      description:
        "Returns a paginated list of companies with optional filtering and sorting",
      tags: ["Companies"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "status",
          schema: {
            type: "string",
          },
          description: "Filter by company status",
        },
        {
          in: "query",
          name: "type",
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          description: "Filter by company type",
        },
        {
          in: "query",
          name: "sort_by",
          schema: {
            type: "string",
            enum: ["name", "createdAt"],
          },
          description: "Field to sort by",
        },
        {
          in: "query",
          name: "sort_order",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
          },
          description: "Sort order (ascending or descending)",
        },
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "Page number for pagination",
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            minimum: 1,
            maximum: 100,
          },
          description: "Number of items per page",
        },
      ],
      responses: {
        [OK]: {
          description: "List of companies",
          headers: {
            "X-Total-Count": {
              schema: {
                type: "integer",
              },
              description: "Total number of companies",
            },
          },
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          description: "Company ID",
                        },
                        name: {
                          type: "string",
                          description: "Company name",
                        },
                        shortName: {
                          type: "string",
                          description: "Company short name",
                        },
                        businessEntity: {
                          type: "string",
                          description: "Business entity type",
                        },
                        address: {
                          type: "string",
                          description: "Company address",
                        },
                        contract: {
                          type: "object",
                          properties: {
                            no: {
                              type: "string",
                              description: "Contract number",
                            },
                            issue_date: {
                              type: "string",
                              format: "date-time",
                              description: "Contract issue date",
                            },
                          },
                        },
                        type: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                          description: "Company types",
                        },
                        status: {
                          type: "string",
                          description: "Company status",
                        },
                        photos: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                description: "Photo URL",
                              },
                              filepath: {
                                type: "string",
                                description: "Photo filepath",
                              },
                              thumbpath: {
                                type: "string",
                                description: "Thumbnail filepath",
                              },
                            },
                          },
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
                  pagination: {
                    type: "object",
                    properties: {
                      total: {
                        type: "integer",
                        description: "Total number of companies",
                      },
                      page: {
                        type: "integer",
                        description: "Current page",
                      },
                      limit: {
                        type: "integer",
                        description: "Items per page",
                      },
                      pages: {
                        type: "integer",
                        description: "Total number of pages",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        [UNAUTHORIZED]: unauthorized,
      },
    },
    post: {
      summary: "Create company",
      description: "Creates a new company",
      tags: ["Companies"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "status", "type"],
              properties: {
                name: {
                  type: "string",
                  description: "Company name",
                },
                shortName: {
                  type: "string",
                  description: "Company short name",
                },
                businessEntity: {
                  type: "string",
                  description: "Business entity type",
                },
                contactId: {
                  type: "string",
                  description: "Associated contact ID",
                },
                address: {
                  type: "string",
                  description: "Company address",
                },
                contract: {
                  type: "object",
                  properties: {
                    no: {
                      type: "string",
                      description: "Contract number",
                    },
                    issue_date: {
                      type: "string",
                      format: "date-time",
                      description: "Contract issue date",
                    },
                  },
                },
                type: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description: "Company types",
                },
                status: {
                  type: "string",
                  description: "Company status",
                },
              },
            },
          },
        },
      },
      responses: {
        [CREATED]: {
          description: "Company created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "Company ID",
                  },
                  name: {
                    type: "string",
                    description: "Company name",
                  },
                  // ... other fields similar to GET response
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
  "/companies/{id}": {
    get: {
      summary: "Get company",
      description: "Returns company details by ID",
      tags: ["Companies"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "Company ID",
        },
      ],
      responses: {
        [OK]: {
          description: "Company details",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "Company ID",
                  },
                  name: {
                    type: "string",
                    description: "Company name",
                  },
                  // ... other fields similar to GET /companies response
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
      summary: "Update company",
      description: "Updates company details",
      tags: ["Companies"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "Company ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Company name",
                },
                // ... other fields similar to POST request
              },
            },
          },
        },
      },
      responses: {
        [OK]: {
          description: "Company updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "Company ID",
                  },
                  // ... other fields similar to GET response
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
      summary: "Delete company",
      description: "Deletes a company by ID",
      tags: ["Companies"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
          description: "Company ID",
        },
      ],
      responses: {
        [OK]: {
          description: "Company deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Company deleted successfully",
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
