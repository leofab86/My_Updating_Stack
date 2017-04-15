import request from 'request';
import bodyParser from 'body-parser';
import config from '../../config';

const frameUrl = `http://127.0.0.1:${config.framePort}/api`;

module.exports = (app) => {

	app.post('/api/signup', bodyParser.urlencoded({extended: true}), (req, res) => {
		
		request.post({url:frameUrl + '/signup', form: req.body}, (err,httpResponse,body) => {
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
		
		request.post({url:frameUrl + '/login', form: req.body}, (err,httpResponse,body) => {
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
			"url": frameUrl + '/logout',
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
		
		authenticate(req, res, function(session){
			res.send(session);
		})
	});

	app.use(function(req, res, next) {
		authenticateAllGet(req, res, next)
	});
}



function authenticateAllGet(req, res, next) {
	if (req.method === 'GET') {
		console.log('authenticating this GET request');

		authenticate(req, res, function(session) {
			res.locals.expressSession = JSON.stringify(session);
			next()
		})

	} else next();
}

function authenticate (req, res, success) {
	
	const options = {
		"method": 'GET',
		"url": frameUrl + '/users/my',
		"headers": {
			"authorization": req.cookies.authHeader
		}
	};

	request(options, (err,httpResponse,body) => {
		if (err) {
			console.error(err);
			res.send(err)	
		}
		let session = createSession(JSON.parse(body), req.cookies.authHeader);
		success(session);
	})
}

function createSession (user, authHeader) {
	let session = {
		authHeader: '',
		status: 'logged-out',
		name: '',
		role: ''
	};

	if (!user._id) return session;
	
	let name;
	let role;	
	if(user.roles.account != undefined) {
		name = user.roles.account.name
		role = 'account'
	}
	else if(user.roles.admin != undefined) {
		name = user.roles.admin.name
		role = 'admin'
	}
	session = {
		authHeader: authHeader,
		status: 'logged-in',
		name: name,
		role: role
	};
	return session;
}