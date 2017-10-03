const bodyParser = require('body-parser');
const Post = require('../models/Post');


module.exports = (app) => {

	app.route('/api/posts')
	.post(bodyParser.json(), (req, res) => {
		const post = new Post(req.body);
		post.save(function(err, data){
			if (err) {
				console.error(err);
				res.status(400).send(err);
			}
			res.send(data);
		});	
		
	})
	.get((req, res) => {
		Post.find(function(error, data){
			res.send(data)
		});
	});

	app.route('/api/posts/:id')
	.delete(function(req,res){
		Post.findOne({
			_id:req.params.id
		}, function(error,doc){
			if (error) console.log(error);
			doc.remove();
			res.send(doc);
		})
	})
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
}