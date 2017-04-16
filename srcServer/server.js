import express from 'express';
import cookieParser from 'cookie-parser';
import config from '../config';

const app = express();

app.use(function logRequest (req, res, next) {
	console.log(`${req.method}: ${req.originalUrl}`); 
	next()
});

//Capture and kill requests
app.get('/favicon.ico', (req, res) => {
	res.send()
})
//--------------------------

app.use(require('connect-livereload')({port: 35729}));
app.use(cookieParser());

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/../dist')

require('./database.js');

app.use('/virtualPath', express.static(__dirname + '/../dist'));

require('./modules/apiRoutes')(app);
require('./modules/frame')(app);

app.get('*', (req, res, next) => {
	console.log('catchAll');
	res.locals.config = JSON.stringify({});
	res.locals.errors = res.locals.errors ? JSON.stringify(res.locals.errors) : null;
	res.render('index.html');
})

app.listen(9005);






