
module.exports = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		srcServer: './srcServer',
		srcServerMain: './srcServer/server.js',
		srcServerjs: './srcServer/**/*.js',
		distServer: './distServer',
		distServerMain: './distServer/server.js',
		srcHtml: './src/index.html',
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
	


};