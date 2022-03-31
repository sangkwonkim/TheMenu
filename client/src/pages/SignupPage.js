import React from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage () {
  return (
    <>
      <div >
        <label>Email</label>
        <input type='email' ></input>
        <br />
        <label>Password</label>
        <input type='password' ></input>
        <br />
        <label>NickName</label>
        <input type='name' ></input>
        <br />
        <button>
          Login
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
