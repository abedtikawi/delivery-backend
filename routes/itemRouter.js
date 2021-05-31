const express = require("express");
const router = express.Router();

router.route('/insert').post(require('../middlewares/validateItem'),require("../controllers/items/insertItem"));
router.route('/:id/update').put(require('../controllers/items/updateItem'));
router.route('/:id/find').get(require('../controllers/items/findItemById'));
router.route('/:id/delete').delete(require('../controllers/items/deleteItem'))
router.route('/:id/dispatch').put(require('../controllers/items/itemDispatch'))
router.route('/destination/:id/update').put(require('../controllers/items/updateDestination'));
router.route('/find').get(require('../controllers/items/getItems'));
router.route('/checkStatus').get(require('../controllers/items/checkStatus'))

module.exports = router;
