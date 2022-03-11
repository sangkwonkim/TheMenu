const { User: UserModel, Atemenu : AtemenuModel } = require('../models');
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
      const accessToken = jwt.sign({ email : userData.email }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ nick :userData.nick, email : userData.email }, process.env.REFRESH_SECRET, { expiresIn: '1d' });
      res.cookie('refreshToken', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: 'strict',
        // httpOnly: true,
        // secure: true
      }).status(200).json({ accessToken: accessToken, userInfo: { id : userData.id, nick : userData.nick} });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: '로그인에 실패했습니다.' });
    }
  },
  logout: async (req, res) => {
      try {
        const accessToken = req.headers['authorization'].split(' ')[1];
        const email = jwt.verify(accessToken, process.env.ACCESS_SECRET).email;
        const userData = await UserModel.update(
          {
            accessToken: null,
            refreshToken: null
          },
          { where: { email: email } }
        );
        res.clearCookie('refreshToken', {
          // sameSite: 'strict',
          // httpOnly: true,
          // secure: true
        }).status(200).json({ message: '로그아웃 되었습니다.' });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.clearCookie('refreshToken', {
          // sameSite: 'strict',
          // httpOnly: true,
          // secure: true
        }).status(200).json({ message: '로그아웃 되었습니다.' });
      } else if (error.message === `Cannot read properties of undefined (reading 'split')`) {
        return res.status(401).json({ message : '로그인이 필요합니다.'});
      }
      res.status(500).json({ message: '로그아웃에 실패했습니다.' });
    }
  },
  signup: async (req, res) => {
    try {
      const userInfo = req.body.userInfo;
      if (!userInfo) return res.status(400).json({ message: '회원가입 정보를 정확하게 입력해주세요.' });
      const email = userInfo.email;
      const nick = userInfo.nick;
      const password = userInfo.password;
      if (!email || !nick || !password) return res.status(400).json({ message: '회원가입 정보를 정확하게 입력해주세요.' });
      const encryptedPassowrd = bcrypt.hashSync(password, 12);
      const duplication = await UserModel.findOrCreate({
        where: {
          email: email
        },
        defaults: {
          email: email,
          nick: nick,
          password: encryptedPassowrd
        }
      });
      if (!duplication[1]) return res.status(400).json({ message: '중복된 아이디입니다.' });
      res.status(201).json({ message: '회원가입에 성공했습니다.'})
    } catch {
      res.status(500).json({ message: '회원가입에 실패했습니다.' });
    }
  },
  delete: async (req, res) => {
    try {
      const user_Id = parseInt(req.params.user_Id, 10);
      if (Number.isNaN(user_Id)) return res.status(400).json({ message: '요청이 잘 못 되었습니다.' });
      const findUser = await UserModel.findOne({
        where: { email: req.decoded.email },
        attributes: [ 'id' ] 
      });
      if (!findUser) return res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
      if (user_Id !== findUser.id) return res.status(403).json({ message: '본인만 탈퇴를 요청할 수 있습니다.' });
      const deleteAtemenu = await AtemenuModel.destroy({ where: { user: findUser.id } });
      const deleteUser = await UserModel.destroy({ where: { id: findUser.id } });
      res.clearCookie('refreshToken', {
        // sameSite: 'strict',
        // httpOnly: true,
        // secure: true
      }).status(200).json({ message: '회원탈퇴 되었습니다.' });
    } catch {
      res.status(500).json({ message: '회원탈퇴에 실패했습니다.' });
    }
  },
  get: async (req, res) => {
    try {
      const user_Id = parseInt(req.params.user_Id, 10);
      if (Number.isNaN(user_Id)) return res.status(400).json({ message: '요청이 잘 못 되었습니다.' });
      const findUser = await UserModel.findOne({
        where: { email: req.decoded.email },
        attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'deletedAt', 'accessToken', 'refreshToken'] }
      });
      if (!findUser) return res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
      if (user_Id !== findUser.id) return res.status(403).json({ message: '본인만 회원 정보를 조회할 수 있습니다.' });
      res.status(200).json({ userInfo : findUser})
    } catch {
      res.status(500).json({ message: '회원 조회에 실패했습니다.' });
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
