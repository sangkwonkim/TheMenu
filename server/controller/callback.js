const axios = require('axios');
const { User: UserModel } = require('../models');
const jwt = require('jsonwebtoken');

const REST_API_KEY = process.env.REST_API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;

module.exports = {
  kakao: async (req, res) => {
    try {
      let access_token = req.body.access_token;
      let refresh_token = req.body.refresh_token;
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
      const findUser = await UserModel.findOne({
        where: {
          email: userEmail
        }
      });
      if (!findUser) {
        const newUser = await UserModel.findOrCreate({
          email: userEmail,
          nick: userNick,
          social: 'kakao'
        });
        const accessToken = jwt.sign({ email: newUser[0].User.dataValues.email }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ nick: newUser[0].User.dataValues.nick, email: newUser[0].User.dataValues.email }, process.env.REFRESH_SECRET, { expiresIn: '1d' });
        const updateUser = await UserModel.update(
          {
            accessToken: access_token,
            refreshToken: refresh_token
          },
          { where: { email: newUser[0].User.dataValues.id } }
        );
        res.cookie('refreshToken', refreshToken, {
          maxAge: 24 * 60 * 60 * 1000
          // sameSite: 'strict',
          // httpOnly: true,
          // secure: true
        }).status(200).json({ accessToken: accessToken, userInfo: { id: newUser[0].User.dataValues.id, email: newUser[0].User.dataValues.email, nick: newUser[0].User.dataValues.nick } });
      } else {
        const accessToken = jwt.sign({ email: findUser.email }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ nick: findUser.nick, email: findUser.email }, process.env.REFRESH_SECRET, { expiresIn: '1d' });
        const updateUser = await UserModel.update(
          {
            accessToken: access_token,
            refreshToken: refresh_token
          },
          { where: { id: findUser.id } }
        );
        res.cookie('refreshToken', refreshToken, {
          maxAge: 24 * 60 * 60 * 1000
          // sameSite: 'strict',
          // httpOnly: true,
          // secure: true
        }).status(200).json({ accessToken: accessToken, userInfo: { id: findUser.id, email: findUser.email, nick: findUser.nick } });
      }
    } catch (e) {
      console.log(e)
    }
  }
};
