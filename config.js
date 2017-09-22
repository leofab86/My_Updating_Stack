
module.exports = {

	port: 9005,
	devBaseUrl: 'http://localhost',

  paths: {
		srcServerMain: './server/babelServer.js',
		srcServerjs: ['./server/**/*.js', './config.js'],
		srcHtml: './app/index.html',
		mainJs: './app/main.js',
		js: ['./app/**/*.js'],
		css: [
			'./app/**/*.css',
		],
		dist: './public'
	},

  database: ''


};



