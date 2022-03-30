const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "theMenu",
      description:
        "직장인들의 영원한 숙제, 몇 가지 질문으로 드시고 싶은 메뉴를 골라보세요. 사용자의 위치에 기반해서 식당을 추천해드립니다.",
    },
    securityDefinitions: {
      security: { bearerAuth: [] },
      bearerAuth: {
        type: 'http',
        name: 'token',
        scheme: 'bearer',
        in: 'header',
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./router/*.js", "./router/user/*.js", "./router/menu/*.js"],
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }
