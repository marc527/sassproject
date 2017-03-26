var gulp = require('gulp'),
 concat = require('gulp-concat'),
 browserify = require('gulp-browserify'),
 connect = require('gulp-connect');

var jsSources = ['components/scripts/*.js'];

gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(concat('scripts.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
    .pipe(connect.reload())
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/development',
    livereload: true
  });
});

gulp.task('default', ['js', 'connect']);
