// 返回值
var Send = {
	all: function (code,data) {
		return {
			code: code,
			data: data
		};
	},
	s2:function (data) {
		return this.all(200,data);
	},
	s4:function (data) {
		return this.all(400,data);
	},
	s5: function (data) {
		return this.all(500,data);
	}
};
exports.Send = Send;
exports.md5 = function (input) {
	return require('crypto').createHash('md5').update(input).digest('hex');
};
exports.getDefineObj = function (obj,properties) {
	var curObj = {};
	properties.forEach(function (item) {
		curObj[item] = obj[item];
	});
	return curObj;
};