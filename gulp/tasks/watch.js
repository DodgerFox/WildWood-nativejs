var gulp        = require('gulp');
var runSequence = require('gulp4-run-sequence');
var reload      = require('browser-sync').reload;


gulp.task('watch', () => {

		const styl = gulp.watch('app/styles/**/*.styl'),
					pug = gulp.watch('app/templates/**/*.pug'),
					scripts = gulp.watch('app/scripts/**/*.js'),
					data = gulp.watch('app/data/**/*.json');

		styl.on('change', (path, stats) => {
		  console.log(`File ${path} was changed`);
				return runSequence('stylus')
				return reload('assets/styles/common.css');
		});
		pug.on('change', (path, stats) => {
		  console.log(`File ${path} was changed`);
				return runSequence('pug')
				reload
		});
		scripts.on('change', (path, stats) => {
		  console.log(`File ${path} was changed`);
				return runSequence('scripts')
				reload
		});
		data.on('change', (path, stats) => {
		  console.log(`File ${path} was changed`);
				return runSequence('data')
				reload
		});

});
