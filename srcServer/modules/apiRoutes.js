import bodyParser from 'body-parser';
import Post from '../models/Post';
import { authenticate } from './frame';


module.exports = (app) => {

	app.route('/api/posts')
	.post(bodyParser.urlencoded({extended: true}), (req, res) => {
		console.log(req.body);
		const post = new Post(req.body);
		post.save(function(err, data){
			if (err) {
				console.log(err);
				res.status(400).send(err);
			}
			console.log(data);
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