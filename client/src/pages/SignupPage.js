import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage () {
  const [signupInfo, setSignupInfo] = useState({ email: '', password: '', nick: '' });
  const navigate = useNavigate();

  const handleInputEmail = (e) => {
    setSignupInfo({
      email: e.target.value,
      password: signupInfo.password,
      nick: signupInfo.nick
    });
  };

  const handleInputPW = (e) => {
    setSignupInfo({
      email: signupInfo.email,
      password: e.target.value,
      nick: signupInfo.nick
    });
  };

  const handleInputNick = (e) => {
    setSignupInfo({
      email: signupInfo.email,
      password: signupInfo.password,
      nick: e.target.value
    });
  };

  const handleSignup = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:4000/user/signup',
      data : { userInfo : signupInfo }
    })
    .then((result) => {
      console.log(result.data);
      navigate('/login')
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  return (
    <>
      <div >
        <label>이메일</label>
        <input type='email' onChange={handleInputEmail}></input>
        <br />
        <label>비밀번호</label>
        <input type='password' onChange={handleInputPW}></input>
        <br />
        <label>비밀번호 확인</label>
        <input type='password' onChange={handleInputPW}></input>
        <br />
        <label>별명</label>
        <input type='name' onChange={handleInputNick}></input>
        <br />
        <button onClick={handleSignup}>
          회원가입
        </button>
        <button>
          카카오 로그인
        </button>
        <button>
          <Link to='/login' >로그인 화면으로 가기</Link>
        </button>
      </div>
    </>
  );
};
