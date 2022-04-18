const router = require('express').Router();
const controller = require('../controller/callback');

router.post('/kakao', controller.kakao);
router.post('/naver', controller.naver);

// 네이버
// 구글 및 깃헙

module.exports = router;
