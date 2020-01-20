const gulp          = require('gulp'),
      gulpif        = require('gulp-if'),
      plumber       = require('gulp-plumber'),
      pug          = require('gulp-pug'),
      inheritance   = require('gulp-pug-inheritance'),
      cache        = require('gulp-cached'),
      filter        = require('gulp-filter'),
      rename        = require('gulp-rename'),
      prettify      = require('gulp-html-prettify'),
      errorHandler  = require('../errorHandler'),
      pkg           = require('../../package.json'),
      paths         = require('../paths');

gulp.task('pug', function() {
	return gulp.src('app/templates/**/*.pug')
  // .pipe(cache('linting'))
  .pipe(plumber({
		errorHandler: errorHandler
	}))

	.pipe(gulpif(global.watch, inheritance({
		basedir: 'app/templates'
	})))
	.pipe(filter(function(file) {
		return /templates[\\\/]pages/.test(file.path);
	}))
  .pipe(pug())
	.pipe(prettify({
		brace_style: 'expand',
		indent_size: 1,
		indent_char: '\t',
		indent_inner_html: true,
		preserve_newlines: true
	})).pipe(rename({
		dirname: '.'
	})).pipe(gulp.dest(paths.dist));
});
