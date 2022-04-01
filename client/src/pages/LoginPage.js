import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage () {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  const handleInputId = (e) => {
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
      data : loginInfo
    })
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  return (
    <>
      <div >
        <label>Email</label>
        <input type='email' onChange={handleInputId} ></input>
        <label>Password</label>
        <input type='password' onChange={handleInputPW} ></input>
        <br />
        <button onClick={handleLogin}>
            Login
        </button>
        <button>
          카카오 로그인
        </button>
        <br />
        <button>
          <Link to='/signup' >회원가입</Link>
        </button>
        <button>
          <Link to='/' >홈으로 가기</Link>
        </button>
      </div>
    </>
  );
};
