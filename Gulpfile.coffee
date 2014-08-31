gulp = require 'gulp'
watch = require 'gulp-watch'
coffee = require 'gulp-coffee'
stylus = require 'gulp-stylus'
jade = require 'gulp-jade'
plumber = require 'gulp-plumber'
rename = require 'gulp-rename'
marked = require 'marked'
fs = require 'fs'

imgs = fs.readdirSync('images/artist').filter (src) -> src.indexOf('.') isnt 0
imgs.sort (x, y) -> if y > x then 1 else -1

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

  gulp
    .src 'views/artist.jade'
    .pipe plumber()
    .pipe watch()
    .pipe rename basename: "index"
    .pipe jade data: imgs: imgs
    .pipe gulp.dest './public/artist'

gulp.task 'default', ->
  gulp
    .src "scripts/**/*.coffee"
    .pipe coffee()
    .pipe gulp.dest './public/scripts/'

  gulp
    .src "styles/**/[a-z]*.styl"
    .pipe stylus()
    .pipe gulp.dest './public/styles/'

  # Render vies
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
    .src 'views/artist.jade'
    .pipe rename basename: "index"
    .pipe jade data: imgs: imgs
    .pipe gulp.dest './public/artist'

  # Copy vendor files
  gulp
    .src 'vendor/**'
    .pipe gulp.dest './public/vendor'

  gulp
    .src 'images/**'
    .pipe gulp.dest './public/images'
