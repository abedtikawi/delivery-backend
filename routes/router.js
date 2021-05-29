const express = require("express");
const router = express.Router();

router.route("/insertItem").post(require("../controllers/createElement"));

module.exports = router;
