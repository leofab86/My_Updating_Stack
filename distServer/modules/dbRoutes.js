'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Post = require('../models/Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = app => {

	app.route('/api/posts').post(_bodyParser2.default.urlencoded({ extended: true }), (req, res) => {
		console.log(req.body);
		const post = new _Post2.default(req.body);
		post.save(function (err, data) {
			if (err) {
				console.log(err);
				res.status(400).send(err);
			}
			console.log(data);
			res.send(data);
		});
	}).get((req, res) => {
		_Post2.default.find(function (error, data) {
			res.send(data);
		});
	});

	app.route('/api/posts/:id').delete(function (req, res) {
		_Post2.default.findOne({
			_id: req.params.id
		}, function (error, doc) {
			if (error) console.log(error);
			doc.remove();
			res.send(doc);
		});
	});
	// .patch(function(req,res){
	// 	Post.findOne({
	// 		_id:req.body._id
	// 	}, function(error,doc){
	// 		for (var key in req.body) {
	// 			doc[key] = req.body[key];
	// 		}
	// 		doc.save();
	// 	})
	// })
};