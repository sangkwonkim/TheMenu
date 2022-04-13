const router = require('express').Router();
const controller = require('../controller/user');
const { verifyToken } = require('../middleware/index');

router.post('/login', controller.login);
/**
 * @swagger
 * paths:
 *  /user/login:
 *    post:
 *      summary: "사용자 로그인"
 *      tags: [User]
 *      requestBody:
 *        description: 정확한 email과 password를 입력하면 로그인됩니다.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: "사용자 고유 아이디"
 *                password:
 *                  type: string
 *                  description: "사용자 비밀번호"
 *      responses:
 *       "200":
 *        description: "로그인 성공"
 *       "400":
 *        description: "로그인 정보를 정확하게 입력하지 않음"
 *       "404":
 *        description: "회원가입한 사용자가 아님"
 *       "500":
 *        description: "서버 에러로 로그인 실패"
 */
router.post('/logout', controller.logout);
/**
 * @swagger
 * paths:
 *  /user/logout:
 *    post:
 *      summary: "사용자 로그아웃"
 *      tags: [User]
 *      responses:
 *       "200":
 *        description: "로그아웃 성공"
 *       "401":
 *        description: "로그인한 사용자가 아닙니다."
 *       "500":
 *        description: "서버 에러로 로그아웃 실패"
 */
router.post('/signup', controller.signup);
/**
 * @swagger
 * paths:
 *  /user/signup:
 *    post:
 *      summary: "회원가입"
 *      tags: [User]
 *      requestBody:
 *       description: 사용하실 email과 password, nick을 입력하면 회원가입이 됩니다.
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           email:
 *            type: string
 *            description: "사용자 아이디"
 *           password:
 *            type: string
 *            description: "사용자 비밀번호"
 *           nick:
 *            type: string
 *            description: "사용자 닉네임"
 *      responses:
 *       "201":
 *        description: "회원가입 성공"
 *       "400":
 *        description: "회원가입 정보 부족, 중복된 아이디로 회원가입 실패"
 *       "500":
 *        description: "서버 에러로 회원가입 실패"
 */
router.delete('/:user_Id', verifyToken, controller.delete);
/**
 * @swagger
 * paths:
 *  /user/{:user_Id}:
 *    delete:
 *      summary: "회원탈퇴"
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: user_Id
 *        schema:
 *          type: string
 *        required: true
 *        description: user_Id
 *      responses:
 *       "200":
 *        description: "회원탈퇴 성공"
 *       "400":
 *        description: "파라미터 값 미입력으로 실패"
 *       "403":
 *        description: "회원 본인이 아니므로 실패"
 *       "500":
 *        description: "서버 에러로 회원탈퇴 실패"
 */
router.get('/:user_Id', verifyToken, controller.get);
/**
 * @swagger
 * paths:
 *  /user/{:user_Id}:
 *    get:
 *      summary: "회원정보 조회"
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: user_Id
 *        schema:
 *          type: string
 *        required: true
 *        description: user_Id
 *      responses:
 *       "200":
 *        description: "회원정보 조회 성공"
 *       "400":
 *        description: "파라미터 값 미입력으로 실패"
 *       "403":
 *        description: "회원 본인이 아니므로 실패"
 *       "404":
 *        description: "회원정보를 찾을 수 없어서 실패"
 *       "500":
 *        description: "서버 에러로 회원정보 조회 실패"
 */
router.patch('/:user_Id', verifyToken, controller.patch);
/**
 * @swagger
 * paths:
 *  /user/{:user_Id}:
 *    patch:
 *      summary: "회원정보 수정"
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: user_Id
 *        schema:
 *          type: string
 *        required: true
 *        description: user_Id
 *      responses:
 *       "200":
 *        description: "회원정보 수정 성공"
 *       "400":
 *        description: "파라미터 값 미입력으로 실패, 수정할 정보 미입력으로 실패"
 *       "403":
 *        description: "회원 본인이 아니므로 실패"
 *       "500":
 *        description: "서버 에러로 회원정보 수정 실패"
 */
router.post('/accesstoken/:user_Id', controller.accesstokenRequest);

module.exports = router;
