"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); //Bundles JS
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat'); //Concatenates files
var eslint = require('gulp-eslint'); //Lint JS files, including JSX
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var gls = require('gulp-live-server');
var watchify = require('watchify');

var config = require('./config');
var paths = config.paths;
var port = config.port;
var devBaseUrl = config.devBaseUrl;



var packageJson = require('./package.json')
var dependencies = Object.keys(packageJson.dependencies)


gulp.task('default', ['devserver']);

var server = gls.new(['--inspect', paths.srcServerMain]);
var file;

// ------------------------ DEVSERVER --------------------------
// --------------------------------------------------------------

gulp.task('devserver', ['lintApp', 'copyHtml', 'css', 'openServer']);


gulp.task('openServer', ['serve'], function () {
	gulp.src('public/index.html')
		.pipe(open({ uri: devBaseUrl + ':' + port + '/'}));
});

gulp.task('serve', ['watchifyApp', 'bundleLibs', 'lintServer'], function() {
	server.start();

	watchServer(server);
});

gulp.task('lintServer', function(){
	return gulp.src(paths.srcServerjs)
		.pipe(eslint())
		.pipe(eslint.format())
});

gulp.task('copyHtml', function() {
	gulp.src(paths.srcHtml)
		.pipe(gulp.dest(paths.dist))
		.pipe(connect.reload())
});

function watchServer (server) {

	gulp.watch(paths.srcServerjs, ['lintServer', function() {
	  //First server.start shuts down server and tries to start but fails because debugger hasnt had time to detach. SetTimeout gives 2nd restart enough time
    server.start()
    setTimeout(()=>server.start(), 300)
	}]).on('change', function(event) {
    file = event;
  })

	gulp.watch(paths.srcHtml, ['copyHtml', function() {
		server.notify.bind(server)(file);
	}]).on('change', function(event) {
		file = event;
	})

	gulp.watch(paths.js, ['lintApp', function() {
		//Dont want to refresh server here because watchifyApp hasn't finished. Watchify takes care of refreshing server
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

gulp.task('frontend', ['copyHtml', 'watchifyApp', 'bundleLibs', 'css', 'lintApp', 'open', 'watch']);


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


gulp.task('css', function() {
	return gulp.src(paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(paths.dist + '/css'))
		.pipe(connect.reload())
});


gulp.task('lintApp', function() {
	return gulp.src(paths.js)
		.pipe(eslint())
		.pipe(eslint.format())
});


gulp.task('bundleLibs', function () {
  const b = browserify({
    debug: true
  });

  // require all libs specified in libs array
  dependencies.forEach(lib => {
    b.require(lib);
  });

  b.bundle()
    .pipe(source('libs.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist + '/scripts'))
});


gulp.task('watch', function () {
	gulp.watch(paths.srcHtml, ['copyHtml'])
	gulp.watch(paths.js, ['lintApp'])
	gulp.watch(paths.css, ['css'])
});


var b = watchify(browserify({
  entries: paths.mainJs,
  debug: true,
  cache: {},
  packageCache: {}
}));

b.external(dependencies)
  .transform('babelify')

gulp.task('watchifyApp', bundle);
b.on('update', bundle);
b.on('log', function(msg) {
  //Refresh server here after a delay because this way watchify has time to write the changes
  setTimeout(()=>{
    server.notify.bind(server)(file)
  }, 1000)
  console.log('Watchify finished: ' + msg)
})

function bundle() {
  console.log('Watchify is applying changes to JS bundle')
  return b.bundle()
    .on('error', console.error.bind(console))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist + '/scripts'))
    .pipe(connect.reload())
}