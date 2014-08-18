gulp = require 'gulp'
watch = require 'gulp-watch'
coffee = require 'gulp-coffee'
stylus = require 'gulp-stylus'
jade = require 'gulp-jade'
plumber = require('gulp-plumber')

gulp.task 'watch', ->
  gulp
    .src "coffeescripts/**/*.coffee"
    .pipe watch()
    .pipe plumber()
    .pipe coffee()
    .pipe gulp.dest('./javascripts/')

  gulp
    .src "stylus/**/[a-z]*.styl"
    .pipe watch()
    .pipe plumber()
    .pipe stylus()
    .pipe gulp.dest('./stylesheets/')

  gulp
    .src 'index.jade', read: false
    .pipe plumber()
    .pipe watch()
    .pipe jade()
    .pipe gulp.dest('./')

gulp.task 'default', ->
