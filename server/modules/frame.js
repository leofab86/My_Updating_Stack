import request from 'request';
import bodyParser from 'body-parser';

const frameUrl = `http://127.0.0.1:/api`;


function authenticate (req, res, callback) {


	if(!req.cookies.authHeader) return callback(createSession(undefined));
	
	const options = {
		"method": 'GET',
		"url": `${frameUrl}/users/my`,
		"headers": {
			"authorization": req.cookies.authHeader
		}
	};

	request(options, (err,httpResponse,body) => {
		if (err) {
			console.error(err);
			return callback( createSession(undefined), err )	
		}
		
		callback(createSession( JSON.parse(body), req.cookies.authHeader ));
	})
}

function createSession (user = {}, authHeader) {
	let session = {
		isSignedIn: false,
	};

	if (!user._id) return session;
	
	session.isSignedIn = true;
	session.authHeader = authHeader;

	if(user.roles.account != undefined) {
		session.user_name = user.roles.account.name
		session.role = 'account'
	}
	else if(user.roles.admin != undefined) {
		session.user_name = user.roles.admin.name
		session.role = 'admin'
	}

	return session;
}


const frameModule = (app) => {

	app.post('/api/signup', bodyParser.urlencoded({extended: true}), (req, res) => {
		
		request.post({url:`${frameUrl}/signup`, form: req.body}, (err,httpResponse,body) => {
			console.log(body);
			if (err) {
				console.error(err);
				return res.send(err);
			}
			body = JSON.parse(body);
			if(body.error) res.send(body);
			res.cookie('authHeader', body.authHeader);
			let session = createSession(body.user, body.authHeader);
			res.send(session);
		})
	});	


	app.post('/api/login', bodyParser.urlencoded({extended: true}), (req, res) => {
		
		request.post({url:`${frameUrl}/login`, form: req.body}, (err,httpResponse,body) => {
			console.log(body);
			if (err) {
				console.error(err);
				return res.send(err);
			}
			body = JSON.parse(body);
			if(body.error) res.send(body);
			res.cookie('authHeader', body.authHeader);
			let session = createSession(body.user, body.authHeader);
			res.send(session);
		})
	});


	app.get('/api/logout', (req, res) => {

		const options = {
			"method": 'DELETE',
			"url": `${frameUrl}/logout`,
			"headers": {
				"authorization": req.cookies.authHeader
			}
		};
		
		request(options, (err,httpResponse,body) => {
			if (err) {
				console.error(err);	
				return res.send(err);
			}
			res.send(body);
		})
	});


	app.get('/api/authenticate', (req, res) => {
		authenticate(req, res, function(session, err){
			if(err) {
				console.error(err);
				return res.send(err);
			}
			res.send(session);
		})
	});


	// app.use(function authenticateGetRequests (req, res, next) {
	// 	if (req.method === 'GET') {
	// 		console.log('authenticating this GET request');

	// 		authenticate(req, res, function(session, err) {
	// 			if(err) res.locals.errors = [err];
	// 			res.locals.session = JSON.stringify(session);
	// 			next()
	// 		})

	// 	} else next();
	// });
}

frameModule.authenticate = authenticate;

module.exports = frameModule;
