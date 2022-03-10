const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try {
        const accessToken = req.headers['authorization'].split(' ')[1];
        req.decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET)
        return next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(419).json({ message: '엑세스 토큰이 만료되었습니다. 엑세스 토큰 재발급 요청이 필요합니다.' });
        }
        return res.status(401).json({ message: '로그인이 필요합니다.'});
    }
}
// accesstoken 있는 지 여부, 유효 여부 확인 미들웨어
// accesstoken이 유효하다면 next();
// accesstoken이 유효하지 않다면 return accesstoken 재발급 요청