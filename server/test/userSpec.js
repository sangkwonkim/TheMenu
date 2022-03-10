const app = require('../app');
const request = require('supertest');
const models = require('../models');
const should = require('should');
const { User: UserModel } = require('../models');
const jwt = require('jsonwebtoken');

  // const refreshToken = jwt.sign({ nick: 'sangkwon', email : email }, process.env.REFRESH_SECRET, { expiresIn: '1d' });


describe('POST /user/login', () => {
  before(() => models.sequelize.sync({ force: true }));
  before(() => UserModel.queryInterface.bulkInsert('Users', [{
    email: 'sangkwon2406@naver.com',
    password: '$2b$10$RJq0gXxBHhLsRhMtI8U3p./kk.KPvdohoMx179N3HvbUaDpPbMi1.',
    nick: 'sangkwon',
    social: 'local',
    createdAt: new Date(),
    updatedAt: new Date()
  }]));
  describe('성공 시', () => {
    it('응답 상태 코드는 200을 반환한다.', (done) => {
      request(app)
        .post('/user/login')
        .send({ email: 'sangkwon2406@naver.com', password: '1234' })
        .expect(200, done);
    });
    it('응답에 accessToken과 유저의 닉네임을 반환한다.', (done) => {
      request(app)
        .post('/user/login')
        .send({ email: 'sangkwon2406@naver.com', password: '1234' })
        .end((err, res) => {
          res.body.should.have.property('accessToken');
          res.body.should.have.property('userInfo', 'sangkwon');
          done();
        });
    });
    it('응답에 refreshToken을 쿠키에 담아 전송합니다.', (done) => {
      request(app)
        .post('/user/login')
        .send({ email: 'sangkwon2406@naver.com', password: '1234' })
        .end((err, res) => {
          res.headers['set-cookie'][0].split(';')[0].split('=')[0].should.equal('refreshToken');
          done();
        });
    });
  });
  describe('실패 시', () => {
    it('회원가입을 하지 않은 유저일 경우 404를 전송한다.', (done) => {
      request(app)
        .post('/user/login')
        .send({ email: 'test@naver.com', password: '1234' })
        .end((err, res) => {
            res.status.should.equal(404)
            res.body.should.have.property('message', '회원가입한 유저가 아닙니다.');
            done();
        })
    });
    it('유저 정보가 정확하지 않을 경우 400을 전송한다.', (done) => {
      request(app)
        .post('/user/login')
        .send({ email: 'test@naver.com' })
        .end((err, res) => {
            res.status.should.equal(400)
            res.body.should.have.property('message', '로그인 정보를 정확하게 입력해주세요.');
            done();
        })
    });
    it('비밀번호가 일치하지 않을 경우 400를 전송한다.', (done) => {
        request(app)
          .post('/user/login')
          .send({ email: 'sangkwon2406@naver.com', password: '56789' })
          .end((err, res) => {
            res.status.should.equal(400)
            res.body.should.have.property('message', '비밀번호가 틀렸습니다.');
            done();
          })
      });
  });
});

describe('POST /user/logout', () => {
  before(() => models.sequelize.sync({ force: true }));
  const email = 'sangkwon2406@naver.com';
  const accessToken = jwt.sign({ email : email }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  before(() => UserModel.queryInterface.bulkInsert('Users', [{
    email: 'sangkwon2406@naver.com',
    password: '$2b$10$RJq0gXxBHhLsRhMtI8U3p./kk.KPvdohoMx179N3HvbUaDpPbMi1.',
    nick: 'sangkwon',
    social: 'local',
    accessToken: null,
    refreshToken: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }]));
  describe('성공 시', () => {
    it('응답 상태 코드는 200을 반환한다.', (done) => {
      request(app)
        .post('/user/logout')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(200)
          res.body.should.have.property('message', '로그아웃 되었습니다.');
          done();
        })
    });
  });
  describe('실패 시', () => {
    it('요청 헤더에 값이 없을 경우에 401을 반환한다.', (done) => {
      request(app)
        .post('/user/logout')
        .end((err, res) => {
          res.status.should.equal(401)
          res.body.should.have.property('message', '로그인이 필요합니다.');
          done();
        })
    });
  });
});

describe('POST /user/logout', () => {
  before(() => models.sequelize.sync({ force: true }));
  const email = 'sangkwon2406@naver.com';
  const accessToken = jwt.sign({ email : email }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  before(() => UserModel.queryInterface.bulkInsert('Users', [{
    email: 'sangkwon2406@naver.com',
    password: '$2b$10$RJq0gXxBHhLsRhMtI8U3p./kk.KPvdohoMx179N3HvbUaDpPbMi1.',
    nick: 'sangkwon',
    social: 'local',
    accessToken: null,
    refreshToken: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }]));
  describe('성공 시', () => {
    it('응답 상태 코드는 200을 반환한다.', (done) => {
      request(app)
        .post('/user/logout')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(200)
          res.body.should.have.property('message', '로그아웃 되었습니다.');
          done();
        })
    });
  });
  describe('실패 시', () => {
    it('요청 헤더에 값이 없을 경우에 401을 반환한다.', (done) => {
      request(app)
        .post('/user/logout')
        .end((err, res) => {
          res.status.should.equal(401)
          res.body.should.have.property('message', '로그인이 필요합니다.');
          done();
        })
    });
  });
});

describe('POST /user/signup', () => {
  before(() => models.sequelize.sync({ force: true }));
  describe('성공 시', () => {
    it('응답 상태 코드는 201을 반환한다.', (done) => {
      request(app)
        .post('/user/signup')
        .send({ userInfo : {
          email: 'sangkwon2406@naver.com',
          password: '1234',
          nick: 'sangkwon',
        }})
        .end((err, res) => {
          res.status.should.equal(201)
          res.body.should.have.property('message', '회원가입에 성공했습니다.');
          done();
        })
    });
  });
  describe('실패 시', () => {
    it('사용자의 정보가 부족할 경우 400을 반환한다.', (done) => {
      request(app)
        .post('/user/signup')
        .send({ userInfo : {
          email: 'sangkwon2406@naver.com',
          nick: 'sangkwon',
        }})
        .end((err, res) => {
          res.status.should.equal(400)
          res.body.should.have.property('message', '회원가입 정보를 정확하게 입력해주세요.');
          done();
        })
    });
    it('email이 중복될 경우 400을 반환한다.', (done) => {
      request(app)
        .post('/user/signup')
        .send({ userInfo : {
          email: 'sangkwon2406@naver.com',
          password: '1234',
          nick: 'sangkwon',
        }})
        .end((err, res) => {
          res.status.should.equal(400)
          res.body.should.have.property('message', '중복된 아이디입니다.');
          done();
        })
    });
  });
});