const express = require("express");
const router = express.Router();

router.route('/insertClient').post(require('../middleware/validateClient'),require('../controllers/insertClient'));

router.route("/insertItem").post(require('../middleware/validateItem'),require("../controllers/insertItem"));

module.exports = router;
