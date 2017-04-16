'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const frameUrl = `http://127.0.0.1:${_config2.default.framePort}/api`;

function authenticate(req, res, callback) {

	const options = {
		"method": 'GET',
		"url": `${frameUrl}/users/my`,
		"headers": {
			"authorization": req.cookies.authHeader
		}
	};

	(0, _request2.default)(options, (err, httpResponse, body) => {
		if (err) {
			console.error(err);
			return callback(createSession(null), err);
		}

		callback(createSession(JSON.parse(body), req.cookies.authHeader));
	});
}

function createSession(user = {}, authHeader) {
	let session = {
		isSignedIn: false
	};

	if (!user._id) return session;

	session.isSignedIn = true;
	session.authHeader = authHeader;

	if (user.roles.account != undefined) {
		session.user_name = user.roles.account.name;
		session.role = 'account';
	} else if (user.roles.admin != undefined) {
		session.user_name = user.roles.admin.name;
		session.role = 'admin';
	}

	return session;
}

const frameModule = app => {

	app.post('/api/signup', _bodyParser2.default.urlencoded({ extended: true }), (req, res) => {

		_request2.default.post({ url: `${frameUrl}/signup`, form: req.body }, (err, httpResponse, body) => {
			console.log(body);
			if (err) {
				console.error(err);
				return res.send(err);
			}
			body = JSON.parse(body);
			if (body.error) res.send(body);
			res.cookie('authHeader', body.authHeader);
			let session = createSession(body.user, body.authHeader);
			res.send(session);
		});
	});

	app.post('/api/login', _bodyParser2.default.urlencoded({ extended: true }), (req, res) => {

		_request2.default.post({ url: `${frameUrl}/login`, form: req.body }, (err, httpResponse, body) => {
			console.log(body);
			if (err) {
				console.error(err);
				return res.send(err);
			}
			body = JSON.parse(body);
			if (body.error) res.send(body);
			res.cookie('authHeader', body.authHeader);
			let session = createSession(body.user, body.authHeader);
			res.send(session);
		});
	});

	app.get('/api/logout', (req, res) => {

		const options = {
			"method": 'DELETE',
			"url": `${frameUrl}/logout`,
			"headers": {
				"authorization": req.cookies.authHeader
			}
		};

		(0, _request2.default)(options, (err, httpResponse, body) => {
			if (err) {
				console.error(err);
				return res.send(err);
			}
			res.send(body);
		});
	});

	app.get('/api/authenticate', (req, res) => {

		authenticate(req, res, function (session) {
			res.send(session);
		});
	});

	app.use(function authenticateGetRequests(req, res, next) {
		if (req.method === 'GET') {
			console.log('authenticating this GET request');

			authenticate(req, res, function (session, err) {
				if (err) res.locals.errors = [err];
				res.locals.session = JSON.stringify(session);
				next();
			});
		} else next();
	});
};

frameModule.authenticate = authenticate;

module.exports = frameModule;