const router = require('express').Router();

const userRoute = require('./user');
const callbackRoute = require('./callback');
const menuRoute = require('./menu');

router.use('/user', userRoute); // 유저 라우트
router.use('/menu', menuRoute); // 메뉴 라우트
router.use('/callback', callbackRoute); // 소셜 로그인 라우트 

module.exports = router;
