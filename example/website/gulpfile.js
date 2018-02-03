var gulp = require('gulp');
// var minifyCSS = require('gulp-csso');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
//FTP
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );

gulp.task('default', [ 'sass', 'concat' ]);



gulp.task('sass', function () {
  return gulp.src('./assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('concat', function() {
  return gulp.src(['./assets/css/bootstrap.css', './assets/css/style.css', './assets/css/watchdogs.css'])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function(){
  gulp.watch('assets/scss/*', ['sass'])
});

////////////////////////////////////////
// FTP DEPLOY
/////////////////////////////////////
gulp.task( 'deploy', function () {
  // https://github.com/morris/vinyl-ftp

	var conn = ftp.create( {
		host:     'home372029328.1and1-data.host',
		user:     'u63816560',
		password: '$Mercury2',
    port:     21,
		parallel: 10, // default is 3
		log:      gutil.log,
    idleTimeout: 25000,
    timeOffset: 0, // Offset server time by this number of minutes, default is 0
    // secure: true,
	} );

	var globs = [
		'assets/css/**',
    'assets/js/**',
    'assets/img/**',
		'index.php',
    'head.php',
    'footer.php'
	];

	// using base = '.' will transfer everything to /public_html correctly
	// turn off buffering in gulp.src for best performance

	return gulp.src( globs, { base: '.', buffer: false } )
		.pipe( conn.newer( '/public_html' ) ) // only upload newer files
		.pipe( conn.dest( '/richebois/projets/citadelle' ) );

} );
