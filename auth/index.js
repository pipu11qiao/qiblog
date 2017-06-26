
//要求后续路由只能登录后的用户才能访问，如果没登录，让他去登录
exports.checkLogin=function (req,res,next) {
    if(req.session.user){
        next();//可以继续向下执行
    }else {
        res.redirect('/user/signin');//没有登录跳到登录页面
    }
};
exports.checkNotLogin=function (req,res,next) {
    if(req.session.user){
        req.session.error='你已经登录，请勿重复登录';
        res.redirect('/')
    }else {
        next();
    }
};