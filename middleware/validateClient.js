const { check } = require("express-validator");

module.exports = [
  check("fname").not().isEmpty().withMessage("Empty fname"),
  check("lname").not().isEmpty().withMessage("Empty lname"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Empty email")
    .isEmail()
    .withMessage("Wrong email syntax"),
  check("phoneNumber")
    .isNumeric()
    .withMessage("Not Numeric")
    .isLength({ min: 6 })
    .withMessage("phoneNumber should be greater than 5"),
  check("password")
    .not()
    .isEmpty()
    .isLength({
      min: 6,
    })
    .withMessage("Empty password"),
];
