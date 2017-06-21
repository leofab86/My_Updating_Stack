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


gulp.task('default', ['devserver']);

// ------------------------ DEVSERVER --------------------------
// --------------------------------------------------------------

gulp.task('devserver', ['frame', 'lint', 'html', 'css', 'openServer']);

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
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});


gulp.task('serve', ['js', 'babelify', 'lintserver'], function() {
	var server = gls.new(['--inspect', config.paths.distServerMain]);
	server.start();

	watchServer(server);
});

gulp.task('babelify', function() {
	return gulp.src(config.paths.srcServerjs)
		.pipe(babel())
		.pipe(gulp.dest(config.paths.distServer));
});

gulp.task('lintserver', function(){
	return gulp.src(config.paths.srcServerjs)
		.pipe(eslint())
		.pipe(eslint.format())
});

function watchServer (server) {
	var file;

	gulp.watch(config.paths.srcServerjs, ['babelify', 'lintserver', function() {
		server.start.bind(server)();		
	}])

	gulp.watch(config.paths.html, ['html', function() {
		server.notify.bind(server)(file);		
	}]).on('change', function(event) {
		file = event;
	})

	gulp.watch(config.paths.js, ['js', 'lint', function() {
		server.notify.bind(server)(file);		
	}]).on('change', function(event) {
		file = event;
	})

	gulp.watch(config.paths.css, ['css', function() {
		server.notify.bind(server)(file);		
	}]).on('change', function(event) {
		file = event;
	})
};


// ------------------------------------ FRONT END ----------------------------------------
// ----------------------------------------------------------------------------------------

gulp.task('frontend', ['html', 'js', 'css', 'lint', 'open', 'watch']);


//Start a local development server
gulp.task('connect', function () {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function () {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload())
});

gulp.task('js', function () {
	return browserify({
			entries: config.paths.mainJs,
			debug: true
		})
		.transform("babelify")
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload())	
});

gulp.task('css', function() {
	return gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload())
});


gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(eslint())
		.pipe(eslint.format())
});

gulp.task('watch', function () {
	gulp.watch(config.paths.html, ['html'])
	gulp.watch(config.paths.js, ['html'])
	gulp.watch(config.paths.css, ['css'])
});