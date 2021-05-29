const { check } = require("express-validator");

module.exports = [
  check("itemName").not().isEmpty().withMessage("Empty itemName"),
  check("price").not().isEmpty().withMessage("Empty price"),
  check("location").not().isEmpty().withMessage("Empty location"),

];