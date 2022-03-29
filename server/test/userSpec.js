const app = require('../app');
const request = require('supertest');
const models = require('../models');
const should = require('should');
const { User: UserModel } = require('../models');
const jwt = require('jsonwebtoken');

const email = 'sangkwon2406@naver.com';
const accessToken = jwt.sign({ email: email }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
const email2 = 'test@naver.com';
const accessToken2 = jwt.sign({ email: email2 }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
const refreshToken = jwt.sign({ nick: 'sangkwon', email: email }, process.env.REFRESH_SECRET, { expiresIn: '1d' });
const signupInfo = [{
  email: email,
  password: '$2b$10$RJq0gXxBHhLsRhMtI8U3p./kk.KPvdohoMx179N3HvbUaDpPbMi1.',
  nick: 'sangkwon',
  social: 'local',
  accessToken: null,
  refreshToken: null,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  email: email2,
  password: '$2b$10$RJq0gXxBHhLsRhMtI8U3p./kk.KPvdohoMx179N3HvbUaDpPbMi1.',
  nick: 'test',
  social: 'local',
  accessToken: null,
  refreshToken: null,
  createdAt: new Date(),
  updatedAt: new Date()
}];

describe('POST /user/login', () => {
  before(() => models.sequelize.sync({ force: true }));
  before(() => UserModel.queryInterface.bulkInsert('Users', signupInfo));
  describe('성공 시', () => {
    it('응답 상태 코드는 200을 반환한다.', (done) => {
      request(app)
        .post('/user/login')
        .send({ email: 'sangkwon2406@naver.com', password: '1234' })
        .expect(200, done);
    });
    it('응답에 accessToken과 유저의 닉네임, id를 반환한다.', (done) => {
      request(app)
        .post('/user/login')
        .send({ email: 'sangkwon2406@naver.com', password: '1234' })
        .end((err, res) => {
          res.body.should.have.property('accessToken');
          res.body.userInfo.should.have.properties({ nick: 'sangkwon', id: 1 });
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
        .send({ email: 'test1234@naver.com', password: '1234' })
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.should.have.property('message', '회원가입한 유저가 아닙니다.');
          done();
        });
    });
    it('유저 정보가 정확하지 않을 경우 400을 전송한다.', (done) => {
      request(app)
        .post('/user/login')
        .send({ email: 'test@naver.com' })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('message', '로그인 정보를 정확하게 입력해주세요.');
          done();
        });
    });
    it('비밀번호가 일치하지 않을 경우 400를 전송한다.', (done) => {
      request(app)
        .post('/user/login')
        .send({ email: 'sangkwon2406@naver.com', password: '56789' })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('message', '비밀번호가 틀렸습니다.');
          done();
        });
    });
  });
});

describe('POST /user/logout', () => {
  before(() => models.sequelize.sync({ force: true }));
  before(() => UserModel.queryInterface.bulkInsert('Users', signupInfo));
  describe('성공 시', () => {
    it('응답 상태 코드는 200을 반환한다.', (done) => {
      request(app)
        .post('/user/logout')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('message', '로그아웃 되었습니다.');
          done();
        });
    });
  });
  describe('실패 시', () => {
    it('요청 헤더에 값이 없을 경우에 401을 반환한다.', (done) => {
      request(app)
        .post('/user/logout')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('message', '로그인이 필요합니다.');
          done();
        });
    });
  });
});

describe('POST /user/signup', () => {
  before(() => models.sequelize.sync({ force: true }));
  describe('성공 시', () => {
    it('응답 상태 코드는 201을 반환한다.', (done) => {
      request(app)
        .post('/user/signup')
        .send({
          userInfo: {
            email: 'sangkwon2406@naver.com',
            password: '1234',
            nick: 'sangkwon'
          }
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.have.property('message', '회원가입에 성공했습니다.');
          done();
        });
    });
  });
  describe('실패 시', () => {
    it('사용자의 정보가 부족할 경우 400을 반환한다.', (done) => {
      request(app)
        .post('/user/signup')
        .send({
          userthis: {
            email: 'sangkwon2406@naver.com',
            nick: 'sangkwon'
          }
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('message', '회원가입 정보를 정확하게 입력해주세요.');
          done();
        });
    });
    it('email이 중복될 경우 400을 반환한다.', (done) => {
      request(app)
        .post('/user/signup')
        .send({
          userInfo: {
            email: 'sangkwon2406@naver.com',
            password: '1234',
            nick: 'sangkwon'
          }
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('message', '중복된 아이디입니다.');
          done();
        });
    });
  });
});

describe('DELETE /user/:user_Id', () => {
  before(() => models.sequelize.sync({ force: true }));
  before(() => UserModel.queryInterface.bulkInsert('Users', signupInfo));
  describe('성공 시', () => {
    it('응답 상태 코드는 200을 반환한다.', (done) => {
      request(app)
        .delete('/user/1')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('message', '회원탈퇴 되었습니다.');
          done();
        });
    });
  });
  describe('실패 시', () => {
    it('이미 탈퇴한 유저의 탈퇴 요청이 올 경우 404를 반환한다.', (done) => {
      request(app)
        .delete('/user/1')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.should.have.property('message', '사용자 정보를 찾을 수 없습니다.');
          done();
        });
    });
    it('user_Id가 숫자가 아닐 경우 400을 응답한다', (done) => {
      request(app)
        .delete('/user/one')
        .set('authorization', `Bearer ${accessToken2}`)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('message', '요청이 잘 못 되었습니다.');
          done();
        });
    });
    it('요청 authorization 헤더에 accessToken이 없다면 401을 반환한다.', (done) => {
      request(app)
        .delete('/user/1')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('message', '로그인이 필요합니다.');
          done();
        });
    });
    it('요청 authorization 헤더에 accessToken에 담긴 정보와 요청 params의 user_Id를 가진 사용자가 다를 경우 403을 반환한다.', (done) => {
      request(app)
        .delete('/user/1')
        .set('authorization', `Bearer ${accessToken2}`)
        .end((err, res) => {
          res.status.should.equal(403);
          res.body.should.have.property('message', '본인만 탈퇴를 요청할 수 있습니다.');
          done();
        });
    });
  });
});

describe('GET /user/:user_Id', () => {
  before(() => models.sequelize.sync({ force: true }));
  before(() => UserModel.queryInterface.bulkInsert('Users', signupInfo));
  describe('성공 시', () => {
    it('응답 상태 코드는 200을 반환한다.', (done) => {
      request(app)
        .get('/user/1')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('userInfo');
          res.body.userInfo.should.have.properties({ email: 'sangkwon2406@naver.com', nick: 'sangkwon', social: 'local' });
          done();
        });
    });
  });
  describe('실패 시', () => {
    it('user_Id가 숫자가 아닐 경우 400을 응답한다', (done) => {
      request(app)
        .get('/user/one')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('message', '요청이 잘 못 되었습니다.');
          done();
        });
    });
    it('요청 authorization 헤더에 accessToken이 없다면 401을 반환한다.', (done) => {
      request(app)
        .get('/user/1')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('message', '로그인이 필요합니다.');
          done();
        });
    });
    it('요청 authorization 헤더에 accessToken에 담긴 정보와 요청 params의 user_Id를 가진 사용자가 다를 경우 403을 반환한다.', (done) => {
      request(app)
        .get('/user/2')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(403);
          res.body.should.have.property('message', '본인만 회원 정보를 조회할 수 있습니다.');
          done();
        });
    });
  });
});

describe('PATCH /user/:user_Id', () => {
  before(() => models.sequelize.sync({ force: true }));
  before(() => UserModel.queryInterface.bulkInsert('Users', signupInfo));
  describe('성공 시', () => {
    it('응답 상태 코드는 200을 반환한다.', (done) => {
      request(app)
        .patch('/user/1')
        .set('authorization', `Bearer ${accessToken}`)
        .send({ userInfo: { nick: 'kim', password: '4567' } })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('message', '회원 정보 수정에 성공했습니다.');
          done();
        });
    });
    it('nick이나 password 둘 중 하나만 있어도 회원 정보가 수정된다.', (done) => {
      request(app)
        .patch('/user/1')
        .set('authorization', `Bearer ${accessToken}`)
        .send({ userInfo: { nick: 'sangkwon' } })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('message', '회원 정보 수정에 성공했습니다.');
          done();
        });
    });
  });
  describe('실패 시', () => {
    it('user_Id가 숫자가 아닐 경우 400을 응답한다', (done) => {
      request(app)
        .patch('/user/one')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('message', '요청이 잘 못 되었습니다.');
          done();
        });
    });
    it('요청에 수정할 회원 정보가 없을 경우 400을 반환한다.', (done) => {
      request(app)
        .patch('/user/1')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('message', '수정할 정보를 정확하게 입력해주세요.');
          done();
        });
    });
    it('요청 authorization 헤더에 accessToken이 없다면 401을 반환한다.', (done) => {
      request(app)
        .patch('/user/1')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('message', '로그인이 필요합니다.');
          done();
        });
    });
    it('요청 authorization 헤더에 accessToken에 담긴 정보와 요청 params의 user_Id를 가진 사용자가 다를 경우 403을 반환한다.', (done) => {
      request(app)
        .patch('/user/2')
        .set('authorization', `Bearer ${accessToken}`)
        .send({ userInfo: { nick: 'sangkwon' } })
        .end((err, res) => {
          res.status.should.equal(403);
          res.body.should.have.property('message', '본인만 회원정보를 수정할 수 있습니다.');
          done();
        });
    });
  });
});
