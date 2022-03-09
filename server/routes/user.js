const router = require('express').Router();
const controller = require('../controller/user');
const verifyToken = require('../middleware/index')

router.post('/login', controller.login);
router.post('/logout', verifyToken, controller.logout);
router.post('/signup', controller.signup);
router.delete('/:user_Id', verifyToken, controller.delete);
router.patch('/:user_Id', verifyToken, controller.patch);
router.get('/:user_Id', verifyToken, controller.get);
router.post('/accesstoken/:user_Id', controller.accesstokenRequest);

module.exports = router;
