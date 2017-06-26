
var mongoose=require('mongoose');
mongoose.Promise=Promise;
mongoose.connect('mongodb://127.0.0.1/blog');
var ObjectId=mongoose.Schema.Types.Object;
var UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
},{collection:'user'});
exports.User=mongoose.model('User',UserSchema);

var ArticleSchema=new mongoose.Schema({
    title:String,
    content:{type:String},
    createAt:{type:Date,default:new Date},
    user:{type:ObjectId,ref:'User'}
},{collection:'article'});
exports.Article=mongoose.model('Article',ArticleSchema);
