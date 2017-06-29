var express = require('express');
//导入操作数据库的用户集合的模型
var Message = require('../db').Message;
var checkLogin = require('../auth').checkLogin;

var router = express.Router();
var util = require('../util');
var Send = util.Send;

//留言增加
router.post('/add', checkLogin, function (req, res) {
  //取得请求体对象
  var user = req.session.user;
  var curMessage = req.body;
  curMessage.createTime = Date.now();
  curMessage.user = user._id;
  Message.create(curMessage, function (err, doc) {
    if (err) {
      res.send(Send.s5(err));
    } else {
      //把保存后的对象作为req.session属性,session对象是在服务器端内存里放置
      res.send(Send.s2(doc));
    }
  })
});
//文章列表
router.post('/index', function (req, res) {
	var pageSize = Math.floor(req.body.pageSize);
	//取得请求体对象
	Message.find({}).sort({createTime: -1}).limit(pageSize).populate('user').exec(function (err, messages) {
		if (err) {
			res.send(Send.s5(err));
		} else {
			res.send(Send.s2({
				messages: messages,
				pageSize: pageSize,
			}));
		}
	});
});
//文章列表
router.post('/list', function (req, res) {
	var pageNum = Math.floor(req.body.pageNum);
	var pageSize = Math.floor(req.body.pageSize);
	//取得请求体对象
	Message.find({}).sort({createTime: -1}).skip((pageNum - 1) * pageSize).limit(pageSize).populate('user').exec(function (err, messages) {
	  console.log(messages);
		Message.count({}, function (err, count) {
		  console.log(messages);
			if (err) {
				res.send(Send.s5(err));
			} else {
				res.send(Send.s2({
					messages: messages,
					pageSize: pageSize,
					pageNum: pageNum,
					count: count
				}));
			}
		});
	});
});

module.exports = router;