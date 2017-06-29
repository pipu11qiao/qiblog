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
//日期格式化
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
//详情页面
var contentFormat = function(value) {
  var str = '';
  var len = 172;
  if (!value) {
    return str;
  }
  value += '';
  str = value.replace(/<[^>]+>/g,'').replace(/\s/g,'');
  if(str.length > len) {
    str = str.slice(0,len) + '...';
  }
  return str;
};
// 分页
Vue.component('pc-pagination', {
  template: '<div class="pagination" >' +
  ' <div class="pull-left">' +
  '<div class="inlineBlock" >共{{vTotalCount}}项</div>' +
  '</div>' +
  '<div class="pull-right">' +
  '<div class="btn-group2 btn-group">' +
  '<button type="button" class="btn btn-page" @click="changePage((vCurPage + 1))">下一页</button>' +
  '<button type="button" class="btn btn-page" @click="changePage(totalPage)">尾页</button>' +
  '</div>' +
  '</div> <div class="btn-group" v-for="item in pageArray">' +
  '<button type="button" class="btn btn-page btn-num" :class="{active: item == vCurPage}" @click="changePage(item)">{{item}}</button>' +
  '</div>' +
  '<div class="btn-group1 btn-group">' +
  '<button type="button" class="btn btn-page"   @click="changePage(1)">首页</button>' +
  '<button type="button" class="btn btn-page"   @click="changePage((vCurPage -1))">上一页</button>' +
  '</div>' +
  '<span class="inlineBlock">{{vCurPage}}/{{totalPage}}页</span>' +
  '</div>',
  props: {
    vCurPage: {
      //当前页数
      type: Number,
      default: 1,
      required: true
    },
    vPageSize: {
      //每页数据条数
      type: Number,
      default: 5,
      required: true
    },
    vTotalCount: {
      // 数据总条数
      type: Number,
      default: 0,
      required: true
    },
    vCountOfBtn: {
      //显示按钮数
      type: Number,
      default: 5
    }
  },
  computed: {
    totalPage: function () {
      return Math.ceil(this.vTotalCount / this.vPageSize);
    },
    pageArray: function () {
      var result, i, len, page;

      result = [];
      len = (this.vCountOfBtn - 1 ) / 2;
      for (i = -len; i < (len + 1); i++) {
        page = this.vCurPage + i;
        if (page > 0 && page <= this.totalPage) {
          result.push(page);
        }
      }
      result.reverse();
      return result;
    }
  },
  methods: {
    changePage: function (page) {
      if (page > 0 && page <= this.totalPage && page !== this.vCurPage) {
        this.$emit('event1', page);
      }
    }
  },
  watch: {
    vPageSize: function () {
      this.$emit('event2', this.vPageSize)
    }
  }
});

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
		curView:1,
		username:'',
		avatar:'',
    articles: [],
    pageNum:1,
    pageSize: 5,
    searchText: '',
    count: 0,
    detailArticle: {},
    isDelete:false,
    type:'',
    addArticle:{
		  title:'',
      content:'',
      type: 0,
    },
    ajaxType:0


	},
	created:function () {
		var data;
		if(sessionStorage.data){
			data = JSON.parse(sessionStorage.data);
			this.isSign=true;
      this.username=data.username;
      this.avatar=data.avatar;
		}
		this.getList();
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
            me.curView=1;
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
				username:$('#username1').val().trim(),
				password:$('#password1').val().trim()
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
            me.curView=1;
            sessionStorage.data=JSON.stringify(data.data);
					}
        }
			})
    },
    //退出
		signOut:function () {
			sessionStorage.removeItem('data');
			this.isSign=false;
			this.isDelete=false;
      this.curView=1;
    },
		//发表文章页面显示
		add:function () {
      this.curView=2;
      this.ajaxType=0;
    },
		//文章详情页面
    detail:function (index) {
      this.curView=3;
		  var me=this;
		  var curArticle = this.articles[index];
		  this.detailArticle=curArticle;
      var name=this.detailArticle.user.username;
      if(me.username==name){
        me.isDelete=true;
      }
      //console.log(me.username);
		  var ajaxData={
		    _id:me.detailArticle._id
      };
		  $.ajax({
        url:'/articles/visited',
        data:JSON.stringify(ajaxData),
        contentType:'application/json',
        type:'post',
        success:function () {

        }
      });

    },
    //发表文章
    saveArticle:function (type) {
		  var me=this;
		  var ajaxData = $.extend({},this.addArticle);
		  if(this.ajaxType==1){
		    ajaxData._id = this.detailArticle._id;
      }
		  var ajaxUrl=this.ajaxType==0?'/articles/add':'/articles/update';

      $.ajax({
        url:ajaxUrl,
        data:JSON.stringify(ajaxData),
        contentType: 'application/json',
        type:'post',
        success:function (data) {
          //console.log(data);
          me.curView=1;
          me.getList();
        }
      })
    },
    pageChange: function (page) {
		  this.pageNum = page;
      this.getList();
    },
    //获取列表
    getList:function () {
      var me=this;
      $.ajax({
        url:'/articles/list',
        data:JSON.stringify(me.listAjaxData),
        contentType: 'application/json',
        type:'post',
        success:function (data) {
          //console.log(data);
          var data=data.data;
          me.count = data.count;
          data.articles.forEach(function (item) {
            switch (item.type){
              case 0:
                item.type='移动前端';
                break;
              case 1:
                item.type='Web前端';
                break;
              default:
                item.type='学无止境'
            }
            item.updateTime = new Date(-(-item.updateTime)).Format('yyyy年MM月dd日');
            item.contentFormat = contentFormat(item.markdown);
          });
          me.articles=data.articles;
        }
      })
    },
    //所有文章
    search:function () {
		  this.pageNum = 1;
      this.getList();
    },
    //删除文章
    deleteArticle:function () {
		  var me=this;
      var name=$('.name').html();
      //console.log(name);
      //console.log(me.detailArticle);
      var ajaxData={
        _id:me.detailArticle._id
      };
        $.ajax({
          url:'/articles/delete',
          data:JSON.stringify(ajaxData),
          contentType:'application/json',
          type:'post',
          success:function (data) {
            me.curView=1;
            me.getList();
          }
        })
    },

    //修改文章
    update:function () {
      this.curView=2;
      this.ajaxType=1;
      console.log(this.detailArticle);
      this.addArticle.title=this.detailArticle.title;
      this.addArticle.content=this.detailArticle.content;
      this.addArticle.content=this.detailArticle.type
    },
    //切换导航
    changeType:function () {
		  var curType= $('.nav-list >.nav-con> a').html();
      if(curType=='移动前端'){
        this.type=0
      }else if(curType=='Web前端'){
        this.type=1
      }else if(curType=='学无止境'){
        this.type=2
      }
    }
	},
  computed: {
	  listAjaxData: function () {
	    var obj = {};
	    obj.pageNum = this.pageNum;
	    obj.pageSize = this.pageSize;
	    obj.search = this.searchText.trim();
	    obj.type=this.type;
      return obj;
    },

  }

});

