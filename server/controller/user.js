module.exports = {
  login: (req, res) => {
    try {
// 로그인 성공 시 accesstoken을 body로 넘겨주고 이 값을 req.authorization 헤더에 Bearer ${accesstoken}으로 신청한다.
    } catch {
    }
  },
  logout: (req, res) => {
    try {
    } catch {
    }
  },
  signup: (req, res) => {
    try {
    } catch {
    }
  },
  delete: (req, res) => {
    try {
    } catch {
    }
  },
  get: (req, res) => {
    try {
    } catch {
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
