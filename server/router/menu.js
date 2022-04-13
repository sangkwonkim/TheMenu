const router = require('express').Router();
const controller = require('../controller/menu');
const { verifyToken } = require('../middleware/index');

router.get('/', controller.get);
/**
 * @swagger
 * paths:
 *  /menu:
 *    get:
 *      summary: "메뉴 조회"
 *      tags: [Menu]
 *      parameters:
 *      - in: query
 *        name: spicy
 *        schema:
 *          type: integer
 *        description: "사용자가 원하는 메뉴의 맵기 정보"
 *      - in: query
 *        name: meat
 *        schema:
 *          type: integer
 *        description: "사용자가 원하는 메뉴의 고기 정보"
 *      - in: query
 *        name: soup
 *        schema:
 *          type: integer
 *        description: "사용자가 원하는 메뉴의 국물 정보"
 *      - in: query
 *        name: style
 *        schema:
 *          type: string
 *        description: "사용자가 원하는 메뉴의 스타일 정보"
 *      - in: query
 *        name: type
 *        schema:
 *          type: string
 *        description: "사용자가 원하는 메뉴의 재료 정보"
 *      responses:
 *       "200":
 *        description: "메뉴 조회 성공"
 *       "400":
 *        description: "쿼리값 입력 오류로 메뉴 조회 실패"
 *       "404":
 *        description: "조건에 충족하는 메뉴가 존재하지 않아 실패"
 *       "500":
 *        description: "서버 에러로 메뉴 조회 실패"
 */
router.post('/:user_Id', verifyToken, controller.post);
/**
 * @swagger
 * paths:
 *  /menu/{:user_Id}:
 *    post:
 *      summary: "선택한 메뉴 저장"
 *      tags: [Menu]
 *      parameters:
 *      - in: path
 *        name: user_Id
 *        schema:
 *          type: integer
 *        required: true
 *        description: user_Id
 *      - in: query
 *        name: menu_Id
 *        schema:
 *          type: integer
 *        description: menu_Id
 *      responses:
 *       "201":
 *        description: "메뉴 저장" 성공"
 *       "400":
 *        description: "파라미터, 쿼리 값 입력 오류로 메뉴 저장 실패"
 *       "403":
 *        description: "회원 본인이 아니므로 실패"
 *       "404":
 *        description: "회원정보를 찾을 수 없어서 실패"
 *       "500":
 *        description: "서버 에러로 회원탈퇴 실패"
 */
router.get('/:user_Id', verifyToken, controller.myMenu);
/**
 * @swagger
 * paths:
 *  /menu/{:user_Id}:
 *    get:
 *      summary: "회원이 저장한 메뉴 조회"
 *      tags: [Menu]
 *      parameters:
 *      - in: path
 *        name: user_Id
 *        schema:
 *          type: integer
 *        required: true
 *        description: user_Id
 *      responses:
 *       "201":
 *        description: "저장한 메뉴 조회 성공"
 *       "400":
 *        description: "파라미터 값 입력 오류로 저장한 메뉴 조회 실패"
 *       "403":
 *        description: "회원 본인이 아니므로 실패"
 *       "404":
 *        description: "회원정보를 찾을 수 없어서 실패, 사용자가 저장한 메뉴가 없음으로 실패"
 *       "500":
 *        description: "서버 에러로 저장한 메뉴 조회 실패"
 */

module.exports = router;
