const app = require('../app');
const request = require('supertest');
const models = require('../models');
const should = require('should');
const { User: UserModel, AteMenu : AteMenuModel, Menu: MenuModel } = require('../models');
const jwt = require('jsonwebtoken');

const menuList = [{
    name : '김치찌개',
    spicy: true,
    meat: true,
    soup: true,
    style: 'korean',
    type : 'rice'
}, {
    name : '된장찌개',
    spicy: false,
    meat: false,
    soup: true,
    style: 'korean',
    type : 'rice'
}, {
    name : '초밥',
    spicy: false,
    meat: false,
    soup: false,
    style: 'japanese',
    type : 'rice'
}, {
    name : '짜장면',
    spicy: false,
    meat: false,
    soup: false,
    style: 'chinese',
    type : 'noodle'
}, {
    name : '짬뽕',
    spicy: true,
    meat: false,
    soup: true,
    style: 'chinese',
    type : 'noodle'
}];
const email = 'sangkwon2406@naver.com';
const accessToken = jwt.sign({ email : email }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
const signupInfo = [{
  email: email,
  password: '$2b$10$RJq0gXxBHhLsRhMtI8U3p./kk.KPvdohoMx179N3HvbUaDpPbMi1.',
  nick: 'sangkwon',
  social: 'local',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  email: 'test@naver.com',
  password: '$2b$10$RJq0gXxBHhLsRhMtI8U3p./kk.KPvdohoMx179N3HvbUaDpPbMi1.',
  nick: 'test',
  social: 'local',
  accessToken: null,
  refreshToken: null,
  createdAt: new Date(),
  updatedAt: new Date()
}];



describe('GET /menu', () => {
  before(() => models.sequelize.sync({ force: true }));
  before(() => MenuModel.queryInterface.bulkInsert('Menus', menuList));
  describe('성공 시', () => {
    it('1. 요청 쿼리에 맞는 음식을 리턴한다.', (done) => {
      request(app)
        .get('/menu?spicy=1&meat=1&soup=1&style=korean&type=rice')
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('menus');
            res.body.menus[0].should.have.property('name', '김치찌개');
            done();
        });
    });
    it('2. 요청 쿼리에 맞는 음식을 리턴한다.', (done) => {
      request(app)
        .get('/menu?style=korean')
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('menus');
          res.body.menus[1].should.have.property('name', '된장찌개');
          done();
        });
    });
    it('3. 요청 쿼리에 맞는 음식을 리턴한다.', (done) => {
      request(app)
      .get('/menu?spicy=0&meat=0&style=japanese')
      .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('menus');
            res.body.menus[0].should.have.property('name', '초밥');
            done();
        });
    });
    it('4. 요청 쿼리에 맞는 음식을 리턴한다.', (done) => {
      request(app)
      .get('/menu?style=chinese')
      .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('menus');
            res.body.menus[0].should.have.property('name', '짜장면');
            res.body.menus[1].should.have.property('name', '짬뽕');
            done();
        });
    });
    it('5. 요청 쿼리가 없을 경우 모든 메뉴를 리턴한다.', (done) => {
      request(app)
      .get('/menu')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('menus');
        res.body.menus[0].should.have.property('name', '김치찌개');
        res.body.menus[2].should.have.property('name', '초밥');
        res.body.menus[4].should.have.property('name', '짬뽕');
        done();
      });
    });
  });
  describe('실패 시', () => {
    it('쿼리의 spicy가 숫자가 아닐 경우 400을 리턴한다.', (done) => {
      request(app)
        .get('/menu?spicy=one')
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('message', 'spicy 요청이 잘 못 되었습니다.');
            done();
        });
    });
    it('쿼리의 meat가 숫자가 아닐 경우 400을 리턴한다.', (done) => {
      request(app)
        .get('/menu?meat=two')
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('message', 'meat 요청이 잘 못 되었습니다.');
            done();
        });
    });
    it('쿼리의 soup가 숫자가 아닐 경우 400을 리턴한다.', (done) => {
      request(app)
        .get('/menu?soup=three')
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('message', 'soup 요청이 잘 못 되었습니다.');
            done();
        });
    });
    it('쿼리의 style이 존재하지 않을 경우 400을 리턴한다.', (done) => {
      request(app)
        .get('/menu?style=italian')
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('message', 'style 요청이 잘 못 되었습니다.');

            done();
        });
    });
    it('쿼리의 type이 존재하지 않을 경우 400을 리턴한다.', (done) => {
      request(app)
        .get('/menu?type=juice')
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('message', 'type 요청이 잘 못 되었습니다.');
            done();
        });
    });
    it('요청에 맞는 메뉴가 없을 경우 404를 리턴한다.', (done) => {
      request(app)
        .get('/menu?spicy=1&meat=1&soup=1&style=japanese&type=bread')
        .end((err, res) => {
            res.status.should.equal(404);
            res.body.should.have.property('message', '조건에 충족하는 메뉴가 존재하지 않습니다.');
            done();
        });
    });
  });
});

describe('POST /menu/:user_Id', () => {
  before(() => models.sequelize.sync({ force: true }));
  before(() => MenuModel.queryInterface.bulkInsert('Menus', menuList));
  before(() => MenuModel.queryInterface.bulkInsert('Users', signupInfo));
  describe('성공 시', () => {
    it('요청 쿼리에 맞는 음식을 리턴한다.', (done) => {
      request(app)
        .post('/menu/1?menu_Id=1')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.have.property('message', '메뉴 저장에 성공했습니다.');
          done();
        });
    });
  });
  describe('실패 시', () => {
    it('menu_Id가 숫자가 아닐 경우 400을 응답한다', (done) => {
      request(app)
        .post('/menu/1?menu_Id=one')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.should.have.property('message', '요청이 잘 못 되었습니다.');
          done();
        });
    });
    it('user_Id가 숫자가 아닐 경우 400을 응답한다', (done) => {
      request(app)
        .post('/menu/one?menu_Id=1')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(400)
          res.body.should.have.property('message', '요청이 잘 못 되었습니다.');
          done();
        })
    });
    it('요청 authorization 헤더에 accessToken이 없다면 401을 반환한다.', (done) => {
      request(app)
        .post('/menu/1?menu_Id=1')
        .end((err, res) => {
          res.status.should.equal(401)
          res.body.should.have.property('message', '로그인이 필요합니다.');
          done();
        })
    });
    it('요청 authorization 헤더에 accessToken에 담긴 정보와 요청 params의 user_Id를 가진 사용자가 다를 경우 403을 반환한다.', (done) => {
      request(app)
        .post('/menu/2?menu_Id=1')
        .set('authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          res.status.should.equal(403)
          res.body.should.have.property('message', '본인만 메뉴를 저장할 수 있습니다.');
          done();
        })
    });
  });
});