import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage () {
  return (
    <>
      <div >
        <label>Email</label>
        <input type='email' ></input>
        <label>Password</label>
        <input type='password' ></input>
        <br />
        <button>
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
