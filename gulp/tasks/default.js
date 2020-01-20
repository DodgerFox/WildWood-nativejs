'use strict';

const gulp = require('gulp'),
      runSequence = require('gulp4-run-sequence');

gulp.task('default', () => {
	return runSequence(
    ['del'], ['libs'],
  [
    'stylus',
    'pug',
    'scripts',
    'imagemin',
    'fonts',
    'data'
  ],
  ['browserSync',
		'watch'])
});
