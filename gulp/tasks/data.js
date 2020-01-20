const gulp          = require('gulp');

gulp.task('data', async () => {
  gulp.src('app/data/**/*.json')
  // .pipe(rigger())
  .pipe(gulp.dest('dist/assets/data'))
});
