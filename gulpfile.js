'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const browserify = require('browserify');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const vinylSource = require('vinyl-source-stream');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const sourceMaps = require('gulp-sourcemaps');

gulp.task('default', ['js', 'css', 'watch']);

gulp.task('js', function () {
  return browserify('./assets/js/bootstrap.js', {debug: true})
  // Вывод ошибок Browserify
    .bundle().on('error', function errorHandler(error) {
      var args = Array.prototype.slice.call(arguments);
      notify.onError('Browserify error: <%= error.message %>').apply(this, args);
      this.emit('end'); // Чтобы gulp не падал при ошибках
    })
    .pipe(vinylSource('combined.js'))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('css', function () {
  return gulp.src('./assets/css/app.scss')
    .pipe(plumber({
      errorHandler: notify.onError('SASS error: <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 10 versions']
    }))
    .pipe(rename('combined.css'))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  browserSync.init({
    proxy: 'localhost:8080',
    port: 3000,
    open: false,
    notify: false,
  });

  gulp.watch([
    './views/**/*.jade'
  ], browserSync.reload);

  gulp.watch([
    './assets/css/**/*.scss'
  ], ['css']);

  gulp.watch([
    './assets/js/**/*.js'
  ], ['js']);
});
