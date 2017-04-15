'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var frameUrl = 'http://127.0.0.1:' + _config2.default.framePort + '/api';
var options = {
	"method": '',
	"url": '',
	"headers": {
		"authorization": ''
	}
};

module.exports = function (app) {

	app.post('/api/signup', _bodyParser2.default.urlencoded({ extended: true }), function (req, res) {

		var form = req.body;

		_request2.default.post({ url: frameUrl + '/signup', form: form }, function (err, httpResponse, body) {
			if (err) {
				console.error(err);
				return res.send(err);
			}
			res.cookie('authHeader', JSON.parse(body).authHeader);
			res.send(body);
		});
	});

	app.post('/api/login', _bodyParser2.default.urlencoded({ extended: true }), function (req, res) {

		var form = req.body;

		_request2.default.post({ url: frameUrl + '/login', form: form }, function (err, httpResponse, body) {
			if (err) {
				console.error(err);
				return res.send(err);
			}
			res.cookie('authHeader', JSON.parse(body).authHeader);
			res.send(body);
		});
	});

	app.get('/api/logout', function (req, res) {

		options.method = "DELETE";
		options.url = frameUrl + '/logout';
		options.headers.authorization = req.cookies.authHeader;

		(0, _request2.default)(options, function (err, httpResponse, body) {
			if (err) {
				console.error(err);
				return res.send(err);
			}
			res.send(body);
		});
	});

	app.get('/api/authenticate', function (req, res) {

		options.method = "GET";
		options.url = frameUrl + '/users/my';
		options.headers.authorization = req.cookies.authHeader;

		(0, _request2.default)(options, function (err, httpResponse, body) {
			if (err) {
				console.error(err);
				return res.send(err);
			}
			res.send(body);
		});
	});

	app.use(authenticate);
};

function authenticate(req, res, next) {
	console.log(req.originalUrl);
	if (req.method === 'GET' && excludeResources(req)) {
		console.log('validating');
		options.method = "GET";
		options.url = frameUrl + '/users/my';
		options.headers.authorization = req.cookies.authHeader;
		(0, _request2.default)(options, function (err, httpResponse, body) {
			if (err) {
				console.error(err);
				return res.send(err);
			}

			var session = createSession(JSON.parse(body), req.cookies.authHeader);

			res.locals.expressSession = session;
			next();
		});
	} else next();
}

function excludeResources(req) {
	return !(!req.originalUrl.indexOf('/css/') || !req.originalUrl.indexOf('/scripts/') || !req.originalUrl.indexOf('/favicon.ico')
	//|| !req.originalUrl.indexOf('/api/')
	);
}

function createSession(user, authHeader) {
	var session = {
		authHeader: '',
		status: 'logged-out',
		name: '',
		role: ''
	};

	if (!user._id) return session;

	var name = void 0;
	var role = void 0;
	if (user.roles.account != undefined) {
		name = user.roles.account.name;
		role = 'account';
	} else if (user.roles.admin != undefined) {
		name = user.roles.admin.name;
		role = 'admin';
	}
	session = {
		authHeader: authHeader,
		status: 'logged-in',
		name: name,
		role: role
	};
	return session;
}