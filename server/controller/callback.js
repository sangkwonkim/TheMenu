const axios = require('axios');
const { User: UserModel } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
  kakao: async (req, res) => {
    try {
      const access_token = req.body.access_token;
      const getUserInfo = await axios({
        method: 'GET',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      const userData = getUserInfo.data;
      const userNick = userData.kakao_account.profile.nickname;
      const userEmail = userData.kakao_account.email;
      const findUser = await UserModel.findOne({
        where: {
          email: userEmail,
          social: 'kakao'
        }
      });
      if (!findUser) {
        const newUser = await UserModel.create({
          email: userEmail,
          nick: userNick,
          social: 'kakao'
        });
        const accessToken = jwt.sign(
          { email: newUser[0].User.dataValues.email },
          process.env.ACCESS_SECRET,
          { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
          {
            nick: newUser[0].User.dataValues.nick,
            email: newUser[0].User.dataValues.email
          },
          process.env.REFRESH_SECRET,
          { expiresIn: '1d' }
        );
        const updateUser = await UserModel.update(
          {
            accessToken: accessToken,
            refreshToken: refreshToken
          },
          { where: { email: newUser[0].User.dataValues.id } }
        );
        res
          .cookie('refreshToken', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000
            // sameSite: 'strict',
            // httpOnly: true,
            // secure: true
          })
          .status(200)
          .json({
            accessToken: accessToken,
            userInfo: {
              id: newUser[0].User.dataValues.id,
              email: newUser[0].User.dataValues.email,
              nick: newUser[0].User.dataValues.nick
            }
          });
      } else {
        const accessToken = jwt.sign(
          { email: findUser.email },
          process.env.ACCESS_SECRET,
          { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
          { nick: findUser.nick, email: findUser.email },
          process.env.REFRESH_SECRET,
          { expiresIn: '1d' }
        );
        const updateUser = await UserModel.update(
          {
            accessToken: accessToken,
            refreshToken: refreshToken
          },
          { where: { id: findUser.id } }
        );
        res
          .cookie('refreshToken', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000
            // sameSite: 'strict',
            // httpOnly: true,
            // secure: true
          })
          .status(200)
          .json({
            accessToken: accessToken,
            userInfo: {
              id: findUser.id,
              email: findUser.email,
              nick: findUser.nick
            }
          });
      }
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        res
          .status(400)
          .json({ message: '동일한 이메일로 회원 가입한 유저가 있습니다.' });
      } else {
        res.status(500).json({ message: '소셜로그인에 실패했습니다.' });
      }
      asdfhnba;
    }
  },
  naver: async (req, res) => {
    try {
      const NAVER_CLIEN_ID = process.env.NAVER_CLIEN_ID;
      const NAVER_CLIEN_SECRET = process.env.NAVER_CLIEN_SECRET;
      const NAVER_STATE = process.env.NAVER_STATE;
      const getToken = await axios({
        method: 'GET',
        url: `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIEN_ID}&client_secret=${NAVER_CLIEN_SECRET}&code=${req.body.code}&state=${NAVER_STATE}`
      });
      const access_token = getToken.data.access_token;
      const getUserInfo = await axios({
        method: 'GET',
        url: 'https://openapi.naver.com/v1/nid/me',
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      const userEmail = getUserInfo.data.response.email;
      const userNick = getUserInfo.data.response.nickname;
      const findUser = await UserModel.findOne({
        where: {
          email: userEmail,
          social: 'naver'
        }
      });

      if (!findUser) {
        const newUser = await UserModel.create({
          email: userEmail,
          nick: userNick,
          social: 'naver'
        });
        const accessToken = jwt.sign(
          { email: newUser[0].User.dataValues.email },
          process.env.ACCESS_SECRET,
          { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
          {
            nick: newUser[0].User.dataValues.nick,
            email: newUser[0].User.dataValues.email
          },
          process.env.REFRESH_SECRET,
          { expiresIn: '1d' }
        );
        const updateUser = await UserModel.update(
          {
            accessToken: accessToken,
            refreshToken: refreshToken
          },
          {
            where: {
              email: newUser[0].User.dataValues.id,
              social: 'naver'
            }
          }
        );
        res
          .cookie('refreshToken', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000
            // sameSite: 'strict',
            // httpOnly: true,
            // secure: true
          })
          .status(200)
          .json({
            accessToken: accessToken,
            userInfo: {
              id: newUser[0].User.dataValues.id,
              email: newUser[0].User.dataValues.email,
              nick: newUser[0].User.dataValues.nick
            }
          });
      } else {
        const accessToken = jwt.sign(
          { email: findUser.email },
          process.env.ACCESS_SECRET,
          { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
          { nick: findUser.nick, email: findUser.email },
          process.env.REFRESH_SECRET,
          { expiresIn: '1d' }
        );
        const updateUser = await UserModel.update(
          {
            accessToken: accessToken,
            refreshToken: refreshToken
          },
          { where: { id: findUser.id } }
        );
        res
          .cookie('refreshToken', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000
            // sameSite: 'strict',
            // httpOnly: true,
            // secure: true
          })
          .status(200)
          .json({
            accessToken: accessToken,
            userInfo: {
              id: findUser.id,
              email: findUser.email,
              nick: findUser.nick
            }
          });
      }
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        res
          .status(400)
          .json({ message: '동일한 이메일로 회원 가입한 유저가 있습니다.' });
      } else {
        res.status(500).json({ message: '소셜로그인에 실패했습니다.' });
      }
    }
  }
};
