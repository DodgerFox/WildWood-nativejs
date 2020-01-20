const gulp  = require('gulp'),
      del   = require('del');

gulp.task('del', function(cb) {
	return del('./dist/*', cb);
});
