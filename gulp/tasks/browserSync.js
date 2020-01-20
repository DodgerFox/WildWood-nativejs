var browserSync, gulp, gutil;

browserSync = require('browser-sync');
gulp        = require('gulp');
gutil       = require('gulp-util');

gulp.task('browserSync', () => {
	return browserSync({
		files: ['dist/**/*'],
		open: !!gutil.env.open,
		port: gutil.env.port || 3001,
		server: {
			baseDir: ['app/scripts', 'dist'],
			routes: {
				'/assets/images': 'app/images',
				'/assets/scripts': 'app/scripts',
				'assets': '/assets'

			},
			directory: false
		}
	});
});
