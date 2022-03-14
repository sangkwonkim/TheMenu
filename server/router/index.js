const router = require('express').Router();
const userRoute = require('./user');
const callbackRoute = require('./callback');
const menuRoute = require('./menu');

router.use('/user', userRoute); 
router.use('/menu', menuRoute); 
// router.use('/callback', callbackRoute);

module.exports = router;
