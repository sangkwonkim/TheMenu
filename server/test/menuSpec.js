const app = require('../app');
const request = require('supertest');
const models = require('../models');
const should = require('should');
const { User: UserModel, AteMenu : AteMenuModel, Menu: MenuModel } = require('../models');

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
}]


describe('GET /user/login', () => {
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
        })
    });
  });
  describe('성공 시', () => {
    it('2. 요청 쿼리에 맞는 음식을 리턴한다.', (done) => {
      request(app)
        .get('/menu?style=korean')
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('menus');
            res.body.menus[1].should.have.property('name', '된장찌개');
            done();
        })
    });
  });
  describe('성공 시', () => {
    it('3. 요청 쿼리에 맞는 음식을 리턴한다.', (done) => {
      request(app)
      .get('/menu?spicy=0&meat=0&style=japanese')
      .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('menus');
            res.body.menus[0].should.have.property('name', '초밥');
            done();
        })
    });
  });
  describe('성공 시', () => {
    it('4. 요청 쿼리에 맞는 음식을 리턴한다.', (done) => {
      request(app)
      .get('/menu?style=chinese')
      .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('menus');
            res.body.menus[0].should.have.property('name', '짜장면');
            res.body.menus[1].should.have.property('name', '짬뽕');
            done();
        })
    });
  });
  describe('성공 시', () => {
    it('5. 요청 쿼리가 없을 경우 모든 메뉴를 리턴한다.', (done) => {
      request(app)
      .get('/menu')
      .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('menus');
            console.log(res.body.menus)
            res.body.menus[0].should.have.property('name', '김치찌개');
            res.body.menus[2].should.have.property('name', '초밥');
            res.body.menus[4].should.have.property('name', '짬뽕');
            done();
        })
    });
  });
});
