var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

var scssPath = './src/';
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
	watch(`${scssPath}**/*.scss`, function(){
		gulp.start('sass');
	});
});

gulp.task('watch', ['sass', 'watch-scss']);

