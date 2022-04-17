import React, { useEffect } from "react";
import axios from 'axios';


export default function KakaoRedirectHandler () {

  let email;
  let nick;

  useEffect(()=> {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code");
    const REACT_APP_REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;


    axios({
      method : 'POST',
      url : `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&code=${code}`
    })
    .then((res) => {
      axios({
        method : 'POST',
        url : 'http://localhost:4000/callback/kakao',
        data : {
          access_token : res.data.access_token,
          refresh_token : res.data.refresh_token
        }
      })
    })
    .then((result) => {
      console.log(result.body)
    })
  
  }, [email, nick])

  return <div>{email, nick}</div>;
};
