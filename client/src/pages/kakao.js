import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


export default function KakaoRedirectHandler ({ setIsLogin, setUserInfo }) {
  const navigate = useNavigate();
  const REACT_APP_REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  
  const getToken = async () => {  
    let code = new URL(document.location.toString()).searchParams.get("code");
    try {
      const token = await axios({
        method : 'POST',
        url : `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&code=${code}`
      })
      getUserInfo(token.data.access_token, token.data.refresh_token);
    } catch (e) {
      alert('재시도 부탁드립니다.')
    }
  };

  const getUserInfo = async (access_token, refresh_token) => {
    // console.log(access_token, refresh_token);
    try {
      const userInfo = await axios({
        method : 'POST',
        url : 'http://localhost:4000/callback/kakao',
        data : {
          access_token : access_token,
          refresh_token : refresh_token
        }
      });
      setUserInfo({
        email : userInfo.data.userInfo.email,
        nickName : userInfo.data.userInfo.nick
      });
    } catch (error) {
      if(error.message === 'Request failed with status code 400') alert ('동일한 이메일로 로컬 회원가입이 되어있습니다.');
      else alert('재시도 부탁드립니다.')
      navigate('/login');
    }
  };
  
  useEffect(()=> {
    getToken();
    setIsLogin(true)
    navigate('/survey');
  }, []);
  
  return <></>;
};
