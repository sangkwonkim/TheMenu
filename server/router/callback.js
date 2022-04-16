const router = require('express').Router();
const controller = require('../controller/callback');

router.get('/kakao', controller.kakao);

// 네이버
// 구글 및 깃헙

module.exports = router;
