const gulp          = require('gulp'),
      plumber       = require('gulp-plumber'),
      rupture       = require('rupture'),
      stylus        = require('gulp-stylus'),
      autoprefixer  = require('gulp-autoprefixer'),
      combineMq     = require('gulp-combine-mq'),
      paths         = require('../paths'),
      errorHandler  = require('../errorHandler'),
      pkg           = require('../../package.json');

gulp.task('stylus', async () => {
	return gulp.src('common.styl', {
		cwd: 'app/styles'
	})
		.pipe(plumber({
  		errorHandler: errorHandler
  	}))
		.pipe(stylus({
			'include css': true,
			errors: true,
			use: rupture(),
      compress: true,
			sourcemap: {
				comment: false,
				inline: false
			}
	}))
	.pipe(autoprefixer(
		'Android >= ' + pkg.browsers.android,
		'Chrome >= ' + pkg.browsers.chrome,
		'Firefox >= ' + pkg.browsers.firefox,
		'Explorer >= ' + pkg.browsers.ie,
		'iOS >= ' + pkg.browsers.ios,
		'Opera >= ' + pkg.browsers.opera,
		'Safari >= ' + pkg.browsers.safari))
	.pipe(combineMq({
		beautify: false
	}))
	.pipe(gulp.dest(paths.styles));
});
