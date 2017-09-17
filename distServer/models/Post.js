'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSchema = {
	title: String,
	body: String,
	author: String,
	date: { type: String, default: timeNow }
};

var Post = _mongoose2.default.model('Post', PostSchema, 'Posts');

exports.default = Post;


function timeNow() {
	return (0, _moment2.default)().format('MMMM Do YYYY, h:mm:ss a');
}
//# sourceMappingURL=Post.js.map
