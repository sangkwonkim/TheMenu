import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


export default function NaverRedirectHandler ({ setIsLogin, setUserInfo }) {
  const navigate = useNavigate();

  const getUserInfo = () => {  
    let code = new URL(document.location.toString()).searchParams.get("code");
    axios({
        method : 'POST',
        url : 'http://localhost:4000/callback/naver',
        data : {
          code : code
        }
    })
    .then((result) => {
      setUserInfo({
        email : result.data.userInfo.email,
        nickName : result.data.userInfo.nick
      });
      setIsLogin(true)
      navigate('/survey');
    })
    .catch((error) => {
      if(error.message === 'Request failed with status code 400') alert ('동일한 이메일로 로컬 회원가입이 되어있습니다.');
      else alert('재시도 부탁드립니다.')
      navigate('/login');
    })
  };
  
  useEffect(()=> {
    getUserInfo();
  }, []);
  
  return <></>;
};
