const router = require('express').Router();
const userRoute = require('./user');
const callbackRoute = require('./callback');
const menuRoute = require('./menu');

router.use('/user', userRoute);
/**
 * @swagger
 * tags:
 *   name: User
 *   description: 로그인, 로그아웃, 회원가입, 탈퇴, 사용자 정보 조회, 사용자 정보 수정
 */

router.use('/menu', menuRoute);
/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: 선택된 메뉴, 내 메뉴 보기, 내 메뉴 저장
 */

// router.use('/callback', callbackRoute);

module.exports = router;
