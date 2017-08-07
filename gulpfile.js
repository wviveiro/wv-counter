var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

var scssPath = './gulp_files/scss/';
var cssDest = './src';



/**
 * SASS
 */
gulp.task('sass', function () {
  return gulp.src(`${scssPath}**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssDest));
});

gulp.task('watch-scss', function() {
	gulp.watch(`${scssPath}**/*.scss`, ['sass']);
});

gulp.task('watch', ['sass', 'watch-scss']);

