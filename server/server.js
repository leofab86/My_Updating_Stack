const express = require('express');
const config = require('../config.js')

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.originalUrl}`);
  next()
});

//Capture and kill requests
app.get('/favicon.ico', (req, res) => {
  res.send()
})
//--------------------------

app.use(require('connect-livereload')({port: 35729}));

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/../public')

if(config.database === 'mongo') require('./mongo.js');

app.use(express.static(__dirname + '/../public'));

require('./modules/apiRoutes')(app);

app.get('*', (req, res, next) => {
  console.log('catchAll');
  res.render('index.html');
})

app.listen(9005);