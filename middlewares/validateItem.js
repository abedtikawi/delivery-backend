const { check } = require("express-validator");

module.exports = [
  check("itemName").not().isEmpty().withMessage("Empty itemName"),
  check("price").not().isEmpty().withMessage("Empty price"),
  check("quantity").not().isEmpty().withMessage("Empty quantity"),
  check("fname").not().isEmpty().withMessage("Empty fname"),
  check("lname").not().isEmpty().withMessage("Empty lname"),
  check("city").not().isEmpty().withMessage("Empty city"),
  check("street").not().isEmpty().withMessage("Empty street"),
  check("phoneNumber")
    .not()
    .isEmpty()
    .withMessage("Empty phoneNumber")
    .isNumeric({ min: 6 })
    .withMessage("Please insert a valid PhoneNumber"),
  check("zipCode").not().isEmpty().withMessage("Empty zipCode"),
];
