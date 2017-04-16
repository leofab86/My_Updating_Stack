'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use(function logRequest(req, res, next) {
	console.log(`${req.method}: ${req.originalUrl}`);
	next();
});

//Capture and kill requests
app.get('/favicon.ico', (req, res) => {
	res.send();
});
//--------------------------

app.use(require('connect-livereload')({ port: 35729 }));
app.use((0, _cookieParser2.default)());

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/../dist');

require('./database.js');

app.use('/virtualPath', _express2.default.static(__dirname + '/../dist'));

require('./modules/apiRoutes')(app);
require('./modules/frame')(app);

app.get('*', (req, res, next) => {
	console.log('catchAll');
	res.locals.config = JSON.stringify({});
	res.locals.errors = res.locals.errors ? JSON.stringify(res.locals.errors) : null;
	res.render('index.html');
});

app.listen(9005);