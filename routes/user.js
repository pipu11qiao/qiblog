var express = require('express');
//导入操作数据库的用户集合的模型
var User = require('../db').User;
var auth = require('../auth');
// var multer=require('multer');
// var upload=multer({dest:'public/'});
//这是一个工厂函数,返回一个路由容器实例
var router = express.Router();
var util = require('../util');
var Send = util.Send;
var md5 = util.md5;
var getDefineObj = util.getDefineObj;
//注册 /user/signup
//路径一定以/开头 模板路径一定不要以/开头
/**
 * 1. 编写注册模板 用户名 密码 邮箱
 * 2. 点击提交按钮提交到后台 post /signup
 * 3. 在/signup里，接收传过来的表单数据，通过body-parser中间件来将请求体放在 req.body上。
 * 4. 引入User模型，然后把此对象保存到数据库中
 */
//处理注册用户时的表单提交
router.post('/signup', function (req, res) {
	//取得请求体对象
	var user = req.body;
	user.password = md5(user.password);
	user.avatar = 'https://www.gravatar.com/avatar/' + md5(user.email) + '?s=200';
	User.findOne({username: user.username}, function (err, oldUser) {
		if (err) {//如果查询过程出错了，则error有值
			res.send(Send.s5(err));
		} else {

			if (oldUser) {
				res.send(Send.s4('用户名已经被占用，请改个别的名字吧,比如' + user.username + '200'));
			} else {
				User.create(user, function (err, doc) {
					if (err) {
						res.send(Send.s5(err));
					} else {
						//把保存后的对象作为req.session属性,session对象是在服务器端内存里放置
						req.session.user = doc;
						res.send(Send.s2(getDefineObj(doc,['username','avatar','createAt'])));
					}
				})
			}
		}
	})
});
//登录

router.post('/signin',function (req, res) {
	var user = req.body;
	User.findOne(user, function (err, doc) {
		if (err) {
			res.send(Send.s5(err));
		} else {
			if (doc) {
				req.session.user = doc;
				res.send(Send.s2(getDefineObj(doc,['username','avatar','createAt'])));
			} else {
				res.send(Send.s4('用户名或密码不正确'));
			}
		}
	});
});
//退出登录
router.get('/signout', function (req, res,next) {
	req.session.user = null;
	res.send(Send.s2('ok'));
});


module.exports = router;