import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage ({ userInfo, setUserInfo }) {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const REACT_APP_REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code`;

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
        email : result.data.email,
        nickName : result.data.nick
      })
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
