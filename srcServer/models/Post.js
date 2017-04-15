import mongoose from 'mongoose';
import moment from 'moment';

const PostSchema = {
	title: String,
	body: String,
	author: String,
	date: { type: String, default: timeNow },
};

const Post = mongoose.model('Post', PostSchema, 'Posts');

export default Post;

function timeNow () {return moment().format('MMMM Do YYYY, h:mm:ss a')}