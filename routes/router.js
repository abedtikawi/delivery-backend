const express = require("express");
const router = express.Router();

router.route('/client/insert').post(require('../middleware/validateClient'),require('../controllers/insertClient'));
router.route('/item/insert').post(require('../middleware/validateItem'),require("../controllers/insertItem"));
router.route('/item/update').put(require('../controllers/updateItem'));
router.route('/item/findByID').get(require('../controllers/findItemById'));
router.route('/item/delete').delete(require('../controllers/deleteItem'))
router.route('/item/dispatch').put(require('../controllers/itemDispatch'))
router.route('/item/destination/update').put(require('../controllers/updateDestination'));
router.route('/item/find').get(require('../controllers/getItems'));
router.route('/item/checkStatus').get(require('../controllers/checkStatus'))
module.exports = router;
