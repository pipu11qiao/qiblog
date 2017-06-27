var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 路由
var index = require('./routes/index');
var users = require('./routes/user');
var articles = require('./routes/article');

// session relative
var session = require('express-session');// req.session 依赖cookie
var MongooseStore = require('connect-mongo')(session);
var app = express();

// // view engine setup          this app don't need
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

//session
app.use(session({
	secret: 'pipublog',
	resave: true, // 每次响应结束后都保存下session数据
	saveUninitialized: true, //保存新创建单位初始化的session
	store: new MongooseStore({
		url: require('./config').dbUrl
	})
}));

app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);

// 接口过滤

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error.html',{error: err});
});

module.exports = app;
