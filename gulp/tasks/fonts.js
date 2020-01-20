const gulp          = require('gulp'),
      changed       = require('gulp-changed'),
      paths         = require('../paths');

  gulp.task('fonts', async () => {
	return gulp.src(['**/*.{ttf,woff,woff2,eot,svg}'], {
		cwd: paths.appFonts
	})
		.pipe(gulp.dest(paths.fonts));
});
