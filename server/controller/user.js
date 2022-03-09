const { User: UserModel } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      if (!email || !password) return res.status(400).json({ message: '로그인 정보를 정확하게 입력해주세요.' });
      const userData = await UserModel.findOne({
        where: {
          email: email
        },
        attributes: { exclude: ['snsId', 'social', 'accessToken', 'refreshToken', 'updatedAt', 'createdAt', 'deletedAt'] }
      });
      if (!userData) return res.status(404).json({ message: '회원가입한 유저가 아닙니다.' });
      const same = bcrypt.compareSync(password, userData.password);
      if (!same) {
        return res.status(400).json({ message: '비밀번호가 틀렸습니다.' });
      }
      const accessToken = jwt.sign({ nick :userData.nick }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({email : userData.email }, process.env.REFRESH_SECRET, { expiresIn: '1d' });
      res.cookie('refreshToken', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: 'strict',
        // httpOnly: true,
        // secure: true
      }).status(200).json({ accessToken: accessToken, userInfo: userData.nick });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: '로그인에 실패했습니다.' });
    }
  },
  logout: (req, res) => {
    try {
    } catch {
    }
  },
  signup: (req, res) => {
    try {
    } catch {
    }
  },
  delete: (req, res) => {
    try {
    } catch {
    }
  },
  get: (req, res) => {
    try {
    } catch {
    }
  },
  patch: (req, res) => {
    try {
    } catch {
    }
  },
  accesstokenRequest: (req, res) => {
    try {
// refreshtoken을 db에 저장하고, accesstoken 요청이 들어오면, cookie에 있는 refreshtoken값이랑 db값 비교해서 accesstoken 재발급
// accesstoken이 만료가 안되었는데 요청이 들어올 경우, refreshtoken이 유효하더라도 둘 다 파기시키고 redirect
// refreshtoken이 만료되었다면, 재로그인 요청 cookie없애고 db 데이터 삭제
    } catch {
    }
  }
};
