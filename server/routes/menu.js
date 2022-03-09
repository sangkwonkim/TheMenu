const router = require('express').Router();
const controller = require('../controller/menu');
const verifyToken = require('../middleware/index')

router.get('/', controller.get);
router.post('/:user_Id', verifyToken, controller.post);
router.get('/:user_Id', verifyToken, controller.myMenu);

module.exports = router;
