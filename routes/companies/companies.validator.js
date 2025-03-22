const path = require("path");
const { body, check, query } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");
const logger = require("../../services/logger.service")(module);
const imageService = require("../../services/image.service");

const getOne = [
  check("id").isMongoId().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const getMany = [
  query("status").optional().isString().withMessage({
    code: UnprocessableEntity,
    message: "status: parameter has incorrect format",
  }),
  query("type").optional().isArray().withMessage({
    code: UnprocessableEntity,
    message: "type: parameter has incorrect format",
  }),
  query("sort_by").optional().isIn(["name", "createdAt"]).withMessage({
    code: UnprocessableEntity,
    message: "sort_by: parameter has incorrect value",
  }),
  query("sort_order").optional().isIn(["asc", "desc"]).withMessage({
    code: UnprocessableEntity,
    message: "sort_order: parameter has incorrect value",
  }),
  query("page").optional().isInt({ min: 1 }).withMessage({
    code: UnprocessableEntity,
    message: "page: parameter has incorrect value",
  }),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage({
    code: UnprocessableEntity,
    message: "limit: parameter has incorrect value",
  }),
  validate,
];

const editOne = [
  check("id").isMongoId().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];
const createOne = [
  check("name").notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "name: parameter is required",
  }),
  check("status").notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "status: parameter is required",
  }),
  check("type").isArray().withMessage({
    code: UnprocessableEntity,
    message: "type: parameter must be an array",
  }),
  validate,
];

const deleteOne = [
  check("id").isMongoId().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const addImage = [
  check("id").isMongoId().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  body()
    .custom((_, { req }) => req.files?.file[0])
    .withMessage({
      code: UnprocessableEntity,
      message: "file: parameter is required",
    })
    .bail()
    .custom(async (_, { req }) => {
      const file = req.files.file[0];
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const tempFilePath = file.path;

      const isAllowedExtension = [".png", ".jpg", ".jpeg", ".gif"].includes(
        fileExtension
      );
      if (!isAllowedExtension) {
        await imageService
          .removeImage(tempFilePath)
          .catch((err) => logger.error(err));
      }
      return isAllowedExtension;
    })
    .withMessage({
      code: UnprocessableEntity,
      message: "files.file: only image files are allowed to upload",
    }),
  validate,
];

const removeImage = [
  check("id").isMongoId().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  check("image_name")
    .notEmpty()
    .withMessage((_, { path }) => ({
      code: UnprocessableEntity,
      message: `${path}: parameter is required`,
    })),
  validate,
];

module.exports = {
  getOne,
  getMany,
  editOne,
  addImage,
  removeImage,
  createOne,
  deleteOne,
};
