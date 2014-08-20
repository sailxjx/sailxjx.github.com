gulp = require 'gulp'
watch = require 'gulp-watch'
coffee = require 'gulp-coffee'
stylus = require 'gulp-stylus'
jade = require 'gulp-jade'
plumber = require 'gulp-plumber'
rename = require 'gulp-rename'
marked = require 'marked'
fs = require 'fs'

gulp.task 'watch', ->
  gulp
    .src "scripts/**/*.coffee"
    .pipe watch()
    .pipe plumber()
    .pipe coffee()
    .pipe gulp.dest './public/scripts/'

  gulp
    .src "styles/**/[a-z]*.styl"
    .pipe watch()
    .pipe plumber()
    .pipe stylus()
    .pipe gulp.dest './public/styles/'

  # Render views
  gulp
    .src 'views/index.jade'
    .pipe plumber()
    .pipe watch()
    .pipe jade data: txt: marked.parse(fs.readFileSync('views/about.md', {encoding: 'utf8'}))
    .pipe gulp.dest './public/'

  gulp
    .src 'views/projects.jade'
    .pipe plumber()
    .pipe watch()
    .pipe rename basename: "index"
    .pipe jade data: txt: marked.parse(fs.readFileSync('views/projects.md', {encoding: 'utf8'}))
    .pipe gulp.dest './public/projects/'

  # Move vendor
  gulp
    .src 'vendor/**'
    .pipe gulp.dest './public/vendor'

gulp.task 'default', ->
  gulp
    .src "scripts/**/*.coffee"
    .pipe coffee()
    .pipe gulp.dest './public/scripts/'

  gulp
    .src "styles/**/[a-z]*.styl"
    .pipe stylus()
    .pipe gulp.dest './public/styles/'

  gulp
    .src 'views/index.jade'
    .pipe jade data: txt: marked.parse(fs.readFileSync('views/about.md', {encoding: 'utf8'}))
    .pipe gulp.dest './public/'

  gulp
    .src 'views/projects.jade'
    .pipe rename basename: "index"
    .pipe jade data: txt: marked.parse(fs.readFileSync('views/projects.md', {encoding: 'utf8'}))
    .pipe gulp.dest './public/projects/'

  gulp
    .src 'vendor/**'
    .pipe gulp.dest './public/vendor'
