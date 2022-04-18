import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage ({ setIsLogin, setUserInfo }) {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const REACT_APP_REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code`;

  const REACT_APP_NAVER_CLIEN_ID = process.env.REACT_APP_NAVER_CLIEN_ID;
  const REACT_APP_NAVER_REDIRECT_URL = process.env.REACT_APP_NAVER_REDIRECT_URL
  const REACT_APP_NAVER_STATE = process.env.REACT_APP_NAVER_STATE
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REACT_APP_NAVER_CLIEN_ID}&redirect_uri=${REACT_APP_NAVER_REDIRECT_URL}&state=${REACT_APP_NAVER_STATE}`;

  const handleInputEmail = (e) => {
    setLoginInfo({
      email: e.target.value,
      password: loginInfo.password
    });
  };

  const handleInputPW = (e) => {
    setLoginInfo({
      email: loginInfo.email,
      password: e.target.value
    });
  };

  const handleLogin = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:4000/user/login',
      // withCredentials: true,
      data: loginInfo
    })
    .then((result) => {
      console.log(result.data);
      setUserInfo({
        email : result.data.userInfo.email,
        nickName : result.data.userInfo.nick
      })
      setIsLogin(true)
      navigate('/survey');
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  return (
    <>
      <div>
        <label>이메일</label>
        <input type='email' onChange={handleInputEmail} />
        <label>비밀번호</label>
        <input type='password' onChange={handleInputPW} />
        <br />
        <button onClick={handleLogin}>
          로그인
        </button>
        <button>
          <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
        </button>
        <button>
          <a href={NAVER_AUTH_URL}>네이버 로그인</a>
        </button>
        <br />
        <button>
          <Link to='/signup'>회원가입</Link>
        </button>
        <button>
          <Link to='/'>홈으로 가기</Link>
        </button>
      </div>
    </>
  );
}
