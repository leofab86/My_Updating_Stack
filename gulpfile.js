"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); //Bundles JS
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var eslint = require('gulp-eslint'); //Lint JS files, including JSX
var babel = require('gulp-babel');
var gls = require('gulp-live-server');
var exec = require('child_process').exec;

var config = require('./config');
var paths = config.paths;
var port = config.port;
var devBaseUrl = config.devBaseUrl;


gulp.task('default', ['devserver']);

// ------------------------ DEVSERVER --------------------------
// --------------------------------------------------------------

gulp.task('devserver', ['frame', 'lint', 'serverHtml', 'css', 'openServer']);

gulp.task('frame', function (){
	exec('node server.js', {
	  cwd: './frame'
	}, function(error, stdout, stderr) {
	  if (error) console.log(error);
	  if (stdout) console.log(stdout);
	  if (stderr) console.log(stderr);
	});
});


gulp.task('openServer', ['serve'], function () {
	gulp.src('dist/index.html')
		.pipe(open({ uri: devBaseUrl + ':' + port + '/'}));
});


gulp.task('serve', ['js', 'babelify', 'lintserver'], function() {
	var server = gls.new(['--inspect', paths.distServerMain]);
	server.start();

	watchServer(server);
});

gulp.task('babelify', function() {
	return gulp.src(paths.srcServerjs)
		.pipe(babel())
		.pipe(gulp.dest(paths.distServer));
});

gulp.task('lintserver', function(){
	return gulp.src(paths.srcServerjs)
		.pipe(eslint())
		.pipe(eslint.format())
});

gulp.task('serverHtml', function() {
	gulp.src(paths.serverHtml)
		.pipe(gulp.dest(paths.dist))
		.pipe(connect.reload())
});

function watchServer (server) {
	var file;

	gulp.watch(paths.srcServerjs, ['babelify', 'lintserver', function() {
		server.start.bind(server)();		
	}])

	gulp.watch(paths.serverHtml, ['serverHtml', function() {
		server.notify.bind(server)(file);		
	}]).on('change', function(event) {
		file = event;
	})

	gulp.watch(paths.js, ['js', 'lint', function() {
		server.notify.bind(server)(file);		
	}]).on('change', function(event) {
		file = event;
	})

	gulp.watch(paths.css, ['css', function() {
		server.notify.bind(server)(file);		
	}]).on('change', function(event) {
		file = event;
	})
};


// ------------------------------------ FRONT END ----------------------------------------
// ----------------------------------------------------------------------------------------

gulp.task('frontend', ['frontendHtml', 'js', 'css', 'lint', 'open', 'watch']);


//Start a local development server
gulp.task('connect', function () {
	connect.server({
		root: ['dist'],
		port: port,
		base: devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function () {
	gulp.src('')
		.pipe(open({ uri: devBaseUrl + ':' + port + '/'}));
});

gulp.task('frontendHtml', function() {
	gulp.src(paths.frontendHtml)
		.pipe(gulp.dest(paths.dist))
		.pipe(connect.reload())
});

gulp.task('js', function () {
	return browserify({
			entries: paths.mainJs,
			debug: true
		})
		.transform("babelify")
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(paths.dist + '/scripts'))
		.pipe(connect.reload())	
});

gulp.task('css', function() {
	return gulp.src(paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(paths.dist + '/css'))
		.pipe(connect.reload())
});


gulp.task('lint', function() {
	return gulp.src(paths.js)
		.pipe(eslint())
		.pipe(eslint.format())
});

gulp.task('watch', function () {
	gulp.watch(paths.frontendHtml, ['frontendHtml'])
	gulp.watch(paths.js, ['js'])
	gulp.watch(paths.css, ['css'])
});