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
exports.User = mongoose.model('User', UserSchema);

// 文章模块
var ArticleSchema = new mongoose.Schema({
	title: String,
	content: {type: String},
	type: String,
	createAt: {
		type: Date,
		default: Date.now()
	},
	updateAt: {
		type: Date,
		default: Date.now()
	},
	user: {
		type: ObjectId,
		ref: 'User'
	}
});
exports.Article = mongoose.model('Article', ArticleSchema);

