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

var server = gls.new(['--inspect', paths.distServerMain]);
var file;

// ------------------------ DEVSERVER --------------------------
// --------------------------------------------------------------

gulp.task('devserver', ['lintApp', 'copySrcHtml', 'css', 'openServer']);


gulp.task('openServer', ['serve'], function () {
	gulp.src('dist/index.html')
		.pipe(open({ uri: devBaseUrl + ':' + port + '/'}));
});

gulp.task('serve', ['watchifyApp', 'bundleLibs', 'babelifyServer', 'lintServer'], function() {
	server.start();

	watchServer(server);
});

gulp.task('babelifyServer', function() {
	return gulp.src(paths.srcServerjs)
    .pipe(sourcemaps.init())
		.pipe(babel())
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.distServer));
});

gulp.task('lintServer', function(){
	return gulp.src(paths.srcServerjs)
		.pipe(eslint())
		.pipe(eslint.format())
});

gulp.task('copySrcHtml', function() {
	gulp.src(paths.srcHtml)
		.pipe(gulp.dest(paths.dist))
		.pipe(connect.reload())
});

function watchServer (server) {

	gulp.watch(paths.srcServerjs, ['babelifyServer', 'lintServer', function() {
		server.start();
	}])

	gulp.watch(paths.srcHtml, ['copySrcHtml', function() {
		server.notify.bind(server)(file);		
	}]).on('change', function(event) {
		file = event;
	})

	gulp.watch(paths.js, ['lintApp', function() {
		//server.notify.bind(server)(file);
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

gulp.task('frontend', ['copySrcHtml', 'watchifyApp', 'bundleLibs', 'css', 'lintApp', 'open', 'watch']);


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
	gulp.watch(paths.srcHtml, ['copySrcHtml'])
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
  .transform('babelify', {
    presets: ['env', 'stage-0', "react"],
    plugins: ['transform-decorators-legacy', 'transform-runtime', 'system-import-transformer'],
    sourceMaps: true
  })

gulp.task('watchifyApp', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', function(msg) {
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















// Old tasks

gulp.task('babelifyApp', function () {
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