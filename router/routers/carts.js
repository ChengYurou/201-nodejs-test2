const {Router} = require('express');
const cartController = require('../../controller/CartController');


const router = Router();
const categoryCtrl = new cartController();

router.get('/', categoryCtrl.getAll);
router.get('/:cartId', categoryCtrl.getOne);
router.post('/', categoryCtrl.create);
router.put('/:cartId', categoryCtrl.update);
router.delete('/:cartId', categoryCtrl.delete);

module.exports = router;