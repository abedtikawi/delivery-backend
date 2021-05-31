const express = require("express");
const router = express.Router();

router.route('/insertClient').post(require('../middleware/validateClient'),require('../controllers/insertClient'));
router.route('/insertItem').post(require('../middleware/validateItem'),require("../controllers/insertItem"));
router.route('/updateItem').put(require('../controllers/updateItem'));
router.route('/updateDestination').put(require('../controllers/updateDestination'));
router.route('/findItem').get(require('../controllers/findItemById'));
router.route('/getItems').get(require('../controllers/getItems'));
router.route('/checkStatus').get(require('../controllers/checkStatus'))

module.exports = router;
