const gulp       = require('gulp');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const sass       = require('gulp-sass');


gulp.task('js', function() {
  return browserify('./app/index.js')
    .transform('babelify', {presets: ['node6', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'))
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
  gulp.watch('./app/**/*.js*', ['js']);
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['js', 'sass', 'watch']);
