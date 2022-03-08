const router = require('express').Router();
const controller = require('../controller/user');

// 로그인
// 로그아웃
// 회원가입
// 회원정보 수정
// 탈퇴
// accesstoken 요청 
    // refreshtoken을 db에 저장하고, accesstoken 요청이 들어오면, cookie에 있는 refreshtoken값이랑 db값 비교해서 accesstoken 재발급
    // accesstoken이 만료가 안되었는데 요청이 들어올 경우, refreshtoken이 유효하더라도 둘 다 파기시키고 redirect
    // refreshtoken이 만료되었다면, 재로그인 요청 cookie없애고 db 데이터 삭제

module.exports = router;
