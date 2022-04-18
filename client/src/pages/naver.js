import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


export default function NaverRedirectHandler ({ setIsLogin, setUserInfo }) {
  const navigate = useNavigate();

  const REACT_APP_NAVER_CLIEN_ID = process.env.REACT_APP_NAVER_CLIEN_ID;
  const REACT_APP_NAVER_CLIEN_SECRET = process.env.REACT_APP_NAVER_CLIEN_SECRET;
  const REACT_APP_NAVER_STATE = process.env.REACT_APP_NAVER_STATE;

  
  const getUserInfo = async () => {  
    let code = new URL(document.location.toString()).searchParams.get("code");
    try {
      // console.log('이게 네이버 코드', code)
      const userInfo = await axios({
        method : 'POST',
        url : 'http://localhost:4000/callback/naver',
        data : {
          code : code
        }
      })
      console.log(userInfo.data)
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(()=> {
    getUserInfo();
    // setIsLogin(true)
    // navigate('/survey');
  }, []);
  
  return <></>;
};
