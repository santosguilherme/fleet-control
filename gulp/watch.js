'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('sass', function () {
  gulp.src(path.join(conf.paths.src, '/assets/scss/**/*.scss'))
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(path.join(conf.paths.src, '/assets/css/')));
});

gulp.task('watch', ['inject'], function () {
  gulp.watch([path.join(conf.paths.src, '/index.html'), 'bower.json'], ['inject']);

  gulp.watch(path.join(conf.paths.src, '/assets/css/**/*.css'), function (event) {
    if (isOnlyChange(event)) {
      browserSync.reload(event.path);
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch([path.join(conf.paths.src, '/app/**/*.js'), path.join(conf.paths.src, '/assets/js/**/*.js')], function (event) {
    if (isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function (event) {
    browserSync.reload(event.path);
  });

  gulp.watch(path.join(conf.paths.src, '/assets/scss/**/*.scss'), function (event) {
    if (isOnlyChange(event)) {
      gulp.start('sass');
    } else {
      gulp.start('inject');
    }
  });
});
