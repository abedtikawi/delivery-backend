const { check } = require("express-validator");

module.exports = [
  check("fname").not().isEmpty().withMessage("Empty fname"),
  check("lname").not().isEmpty().withMessage("Empty lname"),
  check("email").not().isEmpty().withMessage("Empty email"),
  check("password")
    .not()
    .isEmpty()
    .isLength({
      min: 6,
    })
    .withMessage("Empty password"),
];
