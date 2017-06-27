// 用户模块  注册 登录
var user = {
	init: function () {
		this.bind();
	},
	bind: function () {

	}
};
// 轮播
var carousel = {
	data: null,
  init: function () {
    this.initView();
    this.bind();
  },
	initView: function () {
		var unslider = $('#banner').unslider({
			speed: 500,
			fluid: false,
			keys: true,
			dots: true
		});
		this.data = unslider.data('unslider');
	},
	bind: function () {
		var me = this;
		$('.unslider-arrow04').click(function () {
			var fn = this.className.split(' ')[1];
			me.data[fn]();
		});
	}
};

var app = {
    module: [user,carousel],
    init: function () {
     this.module.forEach(function (item) {
       item.init();
     })
    },
    add: function (module) {
      this.module.push(module);
    }
};

// 开始
app.init();


var vm=new Vue({
	el:'#wrapper',
	data:{
		isSign:false,
		isArticle:false,
		username:'',
		avatar:'',
	},
	created:function () {
		var data;
		if(sessionStorage.data){
			data = JSON.parse(sessionStorage.data);
			this.isSign=true;
      this.username=data.username;
      this.avatar=data.avatar;
		}
  },
	methods:{
		//注册登录弹窗
		sign:function (event) {
      if (event.target.className === 'sign') {
        $('.sign').hide();
        $('.in').hide();
        $('.up').hide();
      }
    },
		//注册弹窗
		signUpShow:function () {
      $('.sign').show();
      $('.up').show();
    },
		//登录弹窗
		signInShow:function () {
      $('.sign').show();
      $('.in').show();
    },
		//用户注册
		signUp:function () {
      var username = $('#username').val();
      var email = $('#email').val();
      var password = $('#password').val();
      var repassword = $('#repassword').val();
      var gender = "";
      if (!username) {
        alert('请填写姓名');
        return;
      }
      if (!/[0-9A-Za-z]\w+@\w+\.[a-z0-9A-Z]+$/.test(email)) {
        alert('请填写正确手机号码');
        return;
      }
      if (!/^[0-9a-zA-Z]{1,10}$/.test(password)) {
        alert('必须输入数字或者字母');
      }
      if (password != repassword) {
        alert('密码请保持一致');
        return;
      }
      $('input[type=radio]')[0].checked ? gender = 'male' : gender = 'female';
      var data = {
        username: username,
        email: email,
        password: password,
        gender: gender
      };
      var me=this;
      $.ajax({
        url: '/users/signup',
        data:JSON.stringify(data),
        contentType: 'application/json',
        type: 'post',
        dataType: 'json',
        success: function (data) {
        	if(data.code==400){
            alert(data.data);
					}else{
        		alert("注册成功");
        		me.isSign=true;
            $('.sign').hide();
            $('.up').hide();
            me.username=data.data.username;
            me.avatar=data.data.avatar;
            sessionStorage.data=JSON.stringify(data.data);
					}
        },
        error: function (data) {

        }

      });
    },
    //用户登录
		signIn:function () {
			var me=this;
			var ajaxData={
				username:$('#username1').val(),
				password:$('#password1').val()
			};
			$.ajax({
				url:'/users/signin',
				data:JSON.stringify(ajaxData),
				contentType: 'application/json',
				type:'post',
				success:function (data) {
					if(data.code===400){
						alert(data.data);
					}else {
						alert("登录成功");
            me.isSign=true;
            $('.sign').hide();
            $('.in').hide();
            me.username=data.data.username;
            me.avatar=data.data.avatar;
            sessionStorage.data=JSON.stringify(data.data);
					}
        }
			})
    },
    //退出
		signOut:function () {
			sessionStorage.removeItem('data');
			this.isSign=false;
			this.isArticle=false;
    },
		//发表文章
		add:function () {
			console.log(this.isSign);
      this.isArticle=true;
			$('.list').hide();
			$('.add').show();
    }
	}


});

