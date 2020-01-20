const gulp          = require('gulp'),
      plumber       = require('gulp-plumber'),
      rigger       = require('gulp-rigger'),
      uglify       = require('gulp-uglify-es').default,
      errorHandler  = require('../errorHandler'),
      pkg           = require('../../package.json');

gulp.task('scripts', async () => {
  gulp.src('app/scripts/**/*.js')
  .pipe(plumber({
    errorHandler: errorHandler
  }))
  .pipe(rigger())
  .pipe(uglify())
  .pipe(gulp.dest('dist/assets/scripts'))
});
