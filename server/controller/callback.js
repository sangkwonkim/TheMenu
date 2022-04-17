const axios = require('axios');
const REST_API_KEY = process.env.REST_API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;

module.exports = {
  kakao: async (req, res) => {
    console.log(req.body)
    // let token = await axios({
    //   method: 'POST',
    //   url : `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${req.query.code}`
    // })
    let access_token = req.body.access_token;
    // let refresh_token = token.data.refresh_token;
    let user = await axios({
      method: 'GET',
      url : 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}` 
      }
    })
    let userData = user.data;
    let userNick = userData.kakao_account.profile.nickname;
    let userEmail = userData.kakao_account.email;
    res.send({email : userEmail, nick : userNick})
    // res.redirect('/survey')
    // const findUser = await UserModel.findOne({
    //   where: {
    //     email: userEmail
    //   },
    //   attributes: { exclude: ['snsId', 'social', 'accessToken', 'refreshToken', 'updatedAt', 'createdAt', 'deletedAt'] }
    // });
    // if (!findUser) return;

    // const accessToken = jwt.sign({ email: findUser.email }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
    // const refreshToken = jwt.sign({ nick: findUser.nick, email: findUser.email }, process.env.REFRESH_SECRET, { expiresIn: '1d' });

    // const updateUser = await UserModel.update(
    //   {
    //     accessToken: access_token,
    //     refreshToken: refresh_token
    //   },
    //   { where: { id: findUser.id } }
    // );

    // res.cookie('refreshToken', refreshToken, {
    //   maxAge: 24 * 60 * 60 * 1000
    //   // sameSite: 'strict',
    //   // httpOnly: true,
    //   // secure: true
    // }).status(200).json({ accessToken: accessToken, userInfo: { id: findUser.id, nick: findUser.nick } });

  }
};
