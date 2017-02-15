const {Router} = require('express');
const ItemController = require('../../controller/ItemController');


const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);

module.exports = router;