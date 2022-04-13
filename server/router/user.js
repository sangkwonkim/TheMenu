const router = require('express').Router();
const controller = require('../controller/user');
const { verifyToken } = require('../middleware/index');

router.post('/login', controller.login);
/**
 * @swagger
 * paths:
 *  /user/login:
 *    post:
 *      summary: "회원 로그인"
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
 *                  description: "회원 아이디"
 *                password:
 *                  type: string
 *                  description: "회원 비밀번호"
 *      responses:
 *       "200":
 *        description: "로그인 성공"
 *       "400":
 *        description: "로그인 정보를 정확하게 입력하지 않음"
 *       "404":
 *        description: "회원가입한 회원이 아님으로 실패"
 *       "500":
 *        description: "서버 에러로 로그인 실패"
 */
router.post('/logout', controller.logout);
/**
 * @swagger
 * paths:
 *  /user/logout:
 *    post:
 *      summary: "회원 로그아웃"
 *      tags: [User]
 *      responses:
 *       "200":
 *        description: "로그아웃 성공"
 *       "401":
 *        description: "로그인한 회원이 아님으로 실패."
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
 *            description: "사용할 아이디"
 *           password:
 *            type: string
 *            description: "사용할 비밀번호"
 *           nick:
 *            type: string
 *            description: "사용할 닉네임"
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
 *          type: integer
 *        required: true
 *        description: user_Id
 *      responses:
 *       "200":
 *        description: "회원탈퇴 성공"
 *       "400":
 *        description: "파라미터 값 입력 오류로 실패"
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
 *          type: integer
 *        required: true
 *        description: user_Id
 *      responses:
 *       "200":
 *        description: "회원정보 조회 성공"
 *       "400":
 *        description: "파라미터 값 입력 오류로 실패"
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
 *          type: integer
 *        required: true
 *        description: user_Id
 *      requestBody:
 *        description: 변경할 nick과 password를 입력하면 회원정보가 수정됩니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userInfo :
 *                  type: object
 *                  properties:
 *                   nick:
 *                     type: string
 *                     description: "변경할 회원 닉네임"
 *                   password:
 *                     type: string
 *                     description: "변경할 회원 비밀번호"
 *      responses:
 *       "200":
 *        description: "회원정보 수정 성공"
 *       "400":
 *        description: "파라미터 값 입력 오류로 실패, 수정할 정보 미입력으로 실패"
 *       "403":
 *        description: "회원 본인이 아니므로 실패"
 *       "500":
 *        description: "서버 에러로 회원정보 수정 실패"
 */
router.post('/accesstoken/:user_Id', controller.accesstokenRequest);

module.exports = router;
