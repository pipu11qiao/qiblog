
var fn={
    init:function(){
        this.figure();
        this.userInfo()
    },
    /*轮播图*/
    figure:function () {

        $(document).ready(function(e) {
            var unslider = $('#banner').unslider({
                speed: 500,
                fluid: false,
                keys: true,
                dots: true
            });
            data = unslider.data('unslider');

            $('.unslider-arrow04').click(function() {
                var fn = this.className.split(' ')[1];
                data[fn]();
            });
        });
    },
    userInfo:function () {
        /*注册登录*/
        $('.sign-in').click(function () {
            $('.sign').show();
            $('.in').show();
        });
        $('.sign-up').click(function () {
            $('.sign').show();
            $('.up').show();
        });
        $('.sign').click(function (event) {
            if(event.target.className==='sign'){
                $(this).hide();
                $('.in').hide();
                $('.up').hide();
            }
        });
        $('#btn').click(function () {
            var username=$('#username').val();
            var mobile=$('#phone').val();
            var password = $('#password').val();
            var confirm_password = $('#confirm_password').val();
            var gender = "";
            if(!username){
                alert('请填写姓名');
                return false
            }
            if(!/^\d{11}$/.test(mobile)){
                alert('请填写正确手机号码');
                return false
            }
            if(!/^[0-9a-zA-Z]{1,10}$/.test(password)){
                alert('必须输入数字或者字母');
            }
            if(password!=confirm_password){
                alert('密码请保持一致');
                return false;
            }
            $('input[type=radio]')[0].checked?gender='boy':gender='girl';

            return{
                username:username,
                mobile:mobile,
                password:password,
                gender:gender
            }
        })
    }
};

fn.init();



