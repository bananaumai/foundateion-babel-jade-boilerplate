'use strict'

var gulp = require('gulp');
var jade = require('gulp-jade');
var compass = require('gulp-compass');
var babel = require('gulp-babel');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');

gulp.task('build', ['template', 'stylesheet', 'javascript']);

gulp.task('template', function() {
  gulp.src('./src/jade/*.jade')
      .pipe(jade({
        locals: {title: "test"}
      }))
      .pipe(gulp.dest('./public'))
      .pipe(notify('Building templates succeed'));
});

gulp.task('stylesheet', function() {
  gulp.src('./src/scss/**/*.scss')
      .pipe(compass({
        config_file: 'config.rb',
        css: 'public/css',
        sass: 'src/scss'
      }))
      .pipe(gulp.dest('./public/css'))
      .pipe(notify('Building sass succeed'));
});

gulp.task('javascript', function() {
  gulp.src('src/js/**/*.js')
      .pipe(babel({
        presets: ['babel-preset-es2015']
      }))
      .pipe(gulp.dest('public/js'));
});

gulp.task('server', function() {
  gulp.src('public')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('watch', function() {
  gulp.watch('./src/jade/**/*.jade', ['template']);
  gulp.watch('./src/sass/**/*.scss', ['stylesheet']);
  gulp.watch('./src/js/**/*.js', ['javascript']);
});

gulp.task('default', ['server', 'build', 'watch']);
