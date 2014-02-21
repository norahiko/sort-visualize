var gulp = require('gulp');
var concat = require('gulp-concat');

var srcFiles = 'src/**/*.js';
var destSrc = 'app.js';
var destDir = 'app/js';

gulp.task('default', ['build']);

gulp.task('watch', function() {
    gulp.watch(srcFiles, ['build']);
});

gulp.task('build', function() {
    return gulp.src(srcFiles)
               .pipe(concat(destSrc))
               .pipe(gulp.dest(destDir));
});
