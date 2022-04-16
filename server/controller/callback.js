const axios = require('axios');
const REST_API_KEY = process.env.REST_API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;

module.exports = {
    kakao: (req, res) => {
      // console.log(req.query.code)
      let access_token;
      let refresh_token;

      axios({
        method: 'POST',
        url : `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${req.query.code}`
      })
      .then((result) => {
        access_token = result.data.access_token;
        refresh_token = result.data.refresh_token;
        // console.log(access_token)
        // console.log(refresh_token)
      })
      .then(() => {
        console.log(access_token)
        axios({
          method: 'GET',
          url : 'https://kapi.kakao.com/v2/user/me',
          headers: {
            Authorization: `Bearer ${access_token}` 
          }
        })
      })
      .then((result) => {
        console.log('이거슨', result)
      })
    //   axios({
    //     method: 'GET',
    //     url: `kapi.kakao.com/v2/user/me`,
    //     headers: {
    //       Authorization: `Bearer ${req.query.code}` 
    //     }
    //   })
    //   .then((result) => {
    //     console.log(result)
    //   })
    }
};
