// 用户模块  注册 登录
var user = {
	init: function () {
		this.bind();
	},
	bind: function () {
      /*注册登录*/
		$('.sign-in,.sign-up').click(function () {
			$('.sign').show();
			$('.' + this.className.split('-')[1]).show();
		});


		$('.sign').click(function (event) {
			if (event.target.className === 'sign') {
				$(this).hide();
				$('.in').hide();
				$('.up').hide();
			}
		});
		$('#btn').click(function () {
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
			$.ajax({
				url: '/users/signup',
				data: data,
        type: 'post',
        dataType: 'json',
        success: function (data) {
          console.log(data);
        },
        error: function (data) {
          console.log(data);
        }

			});
		})
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



