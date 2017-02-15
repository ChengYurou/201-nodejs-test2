const {Router} = require('express');
const categoryController = require('../../controller/CategoryController');


const router = Router();
const categoryCtrl = new categoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:categoryId', categoryCtrl.getOne);
router.post('/', categoryCtrl.create);
router.put('/:categoryId', categoryCtrl.update);
router.delete('/:categoryId', categoryCtrl.delete);

module.exports = router;