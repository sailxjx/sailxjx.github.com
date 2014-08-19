gulp = require 'gulp'
watch = require 'gulp-watch'
coffee = require 'gulp-coffee'
stylus = require 'gulp-stylus'
jade = require 'gulp-jade'
plumber = require 'gulp-plumber'
marked = require 'marked'

gulp.task 'watch', ->
  gulp
    .src "scripts/**/*.coffee"
    .pipe watch()
    .pipe plumber()
    .pipe coffee()
    .pipe gulp.dest('./public/scripts/')

  gulp
    .src "styles/**/[a-z]*.styl"
    .pipe watch()
    .pipe plumber()
    .pipe stylus()
    .pipe gulp.dest('./public/styles/')

  gulp
    .src 'views/index.jade', read: false
    .pipe plumber()
    .pipe watch()
    .pipe jade()
    .pipe gulp.dest('./public/')

gulp.task 'default', ->
