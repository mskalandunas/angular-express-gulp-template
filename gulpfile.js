'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var cssnano = require('gulp-cssnano');
var concatCss = require('gulp-concat-css');

var staticFiles = [
  'app/**/*.html',
  'app/**/*.mp3',
  'app/**/*.jpg',
  'app/**/*.png'
];

// add style sheets
var styleSheets = [
  'app/css/theme.css',
  'app/css/style.css'
];

gulp.task('static:dev', function() {
  gulp.src(staticFiles)
  .pipe(gulp.dest('build/'));
});

gulp.task('css:dev', function(){
  return gulp.src(styleSheets)
  .pipe(concatCss('main.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('build/css'));
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/js'));
});


gulp.task('watch:build', function() {
  gulp.watch(staticFiles, ['static:dev']);
  gulp.watch(styleSheets, ['css:dev']);
  gulp.watch('app/**/*.js', ['webpack:dev']);
});

gulp.task('build', ['webpack:dev', 'static:dev', 'css:dev']);
gulp.task('default', ['watch:build']);
