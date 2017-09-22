const mongoose = require('mongoose');
const moment = require('moment');

const PostSchema = {
	title: String,
	body: String,
	author: String,
	date: { type: String, default: timeNow },
};

const Post = mongoose.model('Post', PostSchema, 'Posts');

module.exports = Post;

function timeNow () {return moment().format('MMMM Do YYYY, h:mm:ss a')}