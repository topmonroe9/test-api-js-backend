const { check } = require("express-validator");
const mongoose = require("mongoose");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const validateMongoId = (value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid MongoDB ID format");
  }
  return true;
};

const getOne = [
  check("id").custom(validateMongoId).withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const createOne = [
  check("firstname").notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "firstname: parameter is required",
  }),
  check("lastname").notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "lastname: parameter is required",
  }),
  check("email").optional().isEmail().withMessage({
    code: UnprocessableEntity,
    message: "email: parameter has incorrect format",
  }),
  check("phone").optional().isMobilePhone().withMessage({
    code: UnprocessableEntity,
    message: "phone: parameter has incorrect format",
  }),
  validate,
];

const editOne = [
  check("id").custom(validateMongoId).withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const deleteOne = [
  check("id").custom(validateMongoId).withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

module.exports = { getOne, editOne, createOne, deleteOne };
