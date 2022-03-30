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
 *                  description: "유저 고유 아이디"
 *                password:
 *                  type: string
 *                  description: "유저 비밀번호"
 *      responses:
 *       "200":
 *        description: "로그인 성공"
 *       "400":
 *        description: "로그인 정보를 정확하게 입력하지 않음"
 *       "404":
 *        description: "회원가입한 유저가 아님"
 *       "500":
 *        description: "서버 에러로 로그인 실패"
 */
router.post('/logout', controller.logout);
/**
 * @swagger
 * paths:
 *  /user/logout:
 *   post:
 *      summary: "사용자 로그아웃"
 *      tags: [User]
 *      parameters:
 *      - name: Authorization
 *        in: header
 *        description: 로그인 응답으로 받은 accessToken을 적어주세요.
 *        required: true
 *        scheme: 'bearer'
 *      responses:
 *       "200":
 *        description: "로그아웃 성공"
 *       "401":
 *        description: "로그인한 유저가 아닙니다."
 *       "500":
 *        description: "서버 에러로 로그아웃 실패"
 */
router.post('/signup', controller.signup);
router.delete('/:user_Id', verifyToken, controller.delete);
router.get('/:user_Id', verifyToken, controller.get);
router.patch('/:user_Id', verifyToken, controller.patch);
router.post('/accesstoken/:user_Id', controller.accesstokenRequest);

module.exports = router;
