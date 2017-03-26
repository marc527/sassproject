var gulp = require('gulp'),
 concat = require('gulp-concat'),
 browserify = require('gulp-browserify'),
 connect = require('gulp-connect'),
 compass = require('gulp-compass'),
 gutil = require('gulp-util'),
 watch = require('gulp-watch');

var jsSources = ['components/scripts/*.js'];
var sassSources = ['components/sass/style.scss'];

gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(concat('scripts.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
    .pipe(connect.reload())
});

gulp.task('compass', function(){
  gulp.src(sassSources)
  .pipe(compass({
    css: 'builds/development/css',
    sass: 'components/sass',
    image: 'builds/development/images',
    style: 'expanded',
    require: ['susy']
  })
  .on('error', gutil.log))
  .pipe(gulp.dest('builds/development/css'))
  .pipe(connect.reload())
});

gulp.task('html', function(){
  gulp.src('builds/development/*.html')
    .pipe(connect.reload())
});

gulp.task('watch', function(){
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['compass']);
  gulp.watch('builds/development/*.html', ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/development',
    livereload: true
  });
});

gulp.task('default', ['js', 'compass', 'watch', 'connect']);
