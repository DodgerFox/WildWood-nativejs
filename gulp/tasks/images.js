const gulp          = require('gulp'),
      plumber       = require('gulp-plumber'),
      imagemin      = require('gulp-imagemin'),
      errorHandler  = require('../errorHandler'),
      paths         = require('../paths');

gulp.task('imagemin', async () => {
  gulp.src('app/images/**/*')
  .pipe(plumber({
		errorHandler: errorHandler
	}))
  .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
  ]))
  .pipe(gulp.dest('dist/assets/images'))
});
