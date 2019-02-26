const express = require('express'),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    demo = require('./routes/demo'),
    sample = require('./routes/sample');

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {   // path를 생략하면 '/*'와 같다. 즉 모든 요청에 대해 처리된다
    console.log('모든 요청에 대한 처리');
    next();
});

app.get('/', (req, res, next) => {
    res.type('text/html');
    res.send('<h1>Hello node</h1>');
});

app.use('/demo', demo);
app.use('/sample', sample);

// 커스텀 404 페이지
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

const errHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
};

// 커스텀 500 페이지
app.use(errHandler);

app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl + c to terminate...`);
});