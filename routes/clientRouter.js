const express = require("express");
const router = express.Router();



router.route('/insert').post(require('../middlewares/validateClient'),require('../controllers/clients/insertClient'));



module.exports = router;
