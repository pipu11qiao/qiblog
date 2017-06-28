var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/qiblog');
var ObjectId = mongoose.Schema.Types.Object;
// 用户模块
var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	avatar: String,
	gender: String,
	createTime: Number
});
exports.User = mongoose.model('users', UserSchema);

// 文章模块
var ArticleSchema = new mongoose.Schema({
	title: String,
	content: String,
	markdown: String,
	type: Number,
	decorate:String,
	createTime: Number,
	updateTime: Number,
	visited: Number,
	user: {
		type: ObjectId,
		ref: 'users'
	}
});
exports.Article = mongoose.model('articles', ArticleSchema);

