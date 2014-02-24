"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');

var srcFiles = [
    'src/helper.js',
    'src/graph.js',
    'src/sort.js',
    'src/viewmodel.js',
    'src/main.js',
];
var destSrc = 'app.js';
var destDir = 'app/js';

var stylusFiles = 'app/css/*.styl';
var stylusDestDir = 'app/css';


gulp.task('default', ['build', 'stylus']);

gulp.task('watch', function() {
    gulp.watch(srcFiles, ['js']);
    gulp.watch(stylusFiles, ['stylus']);
});

gulp.task('build', ['js', 'stylus']);

gulp.task('js', function() {
    return gulp.src(srcFiles)
               .pipe(concat(destSrc))
               .pipe(gulp.dest(destDir));
});

gulp.task('stylus', function() {
    gulp.src(stylusFiles)
         .pipe(stylus())
         .on('error', function(err) { console.error(err.message) })
         .pipe(gulp.dest(stylusDestDir));
});

