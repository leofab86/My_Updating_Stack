
module.exports = {
	framePort: 9000,
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		srcServer: './srcServer',
		srcServerMain: './srcServer/server.js',
		srcServerjs: './srcServer/**/*.js',
		distServer: './distServer',
		distServerMain: './distServer/server.js',
		serverHtml: './src/index.html',
		frontendHtml: './src/frontend/index.html',
		mainJs: './src/main.js',
		js: ['./src/**/*.js', './config.js'],
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'./src/**/*.css',
			'node_modules/toastr/toastr.scss'
		],
		dist: './dist'
		
	},

	clientConfig: {
		ReactComponent: require('react').PureComponent,
		debugging: true,
		reduxDevtools: false,
		stateTracker: true,
		updateReports: { update: true, pass: false },
		ajaxLogging: true
	},

	


};