const { check } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const getAuth = [
  check("user")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "user: parameter is required",
    })
    .bail()
    .custom((value) => value.id)
    .withMessage({
      code: UnprocessableEntity,
      message: "user.id: parameter is required",
    }),
  validate,
];

const login = [
  check("username")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "username: parameter is required"
    }),
  check("password")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "password: parameter is required"
    }),
  validate,
];

const register = [
  check("username")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "username: parameter is required"
    }),
  check("password")
    .notEmpty()
    .withMessage({
      code: UnprocessableEntity,
      message: "password: parameter is required"
    })
    .isLength({ min: 6 })
    .withMessage({
      code: UnprocessableEntity,
      message: "password: must be at least 6 characters long"
    }),
  validate,
];

module.exports = { getAuth, login, register };
