
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.resolve('node_modules')));//指定静态文件根目录
app.use(express.static(path.resolve('views')));//指定静态文件根目录,返回首页的html



//指定模板引擎，指定自动添加的后缀
app.set('view engine','html');
//指定模板的存放目录，模板根目录
app.set('views',path.resolve('views'));
//指定对于.html后缀的模块用ejs方法来进行渲染
app.engine('.html',require('ejs').__express);


var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
//当路径是以/user开头的话，会交由路由中间件来处理

app.use('/',index);



app.listen(8888,function(err){
  if(err) {
    console.log(err);
    return;
  }
  console.log('app is listening 8088');
});