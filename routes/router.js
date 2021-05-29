const express = require("express");
const router = express.Router();

router.route("/createElement").post(require("../controllers/createElement"));

module.exports = router;
