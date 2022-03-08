const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const routes = require('routes');

dotenv.config();
const app = express();

app.set('port', 4000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.use('/', router);

app.use((req, res, next) => {
    res.status(404).send('404 해당 페이지는 존재하지 않습니다.');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중' );
});