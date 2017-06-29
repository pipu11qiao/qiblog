var express = require('express');
//导入操作数据库的用户集合的模型
var Message = require('../db').Message;
var checkLogin = require('../auth').checkLogin;

var router = express.Router();
var util = require('../util');
var Send = util.Send;

//文章增加
router.post('/addMessage', checkLogin, function (req, res) {
  console.log(req);
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