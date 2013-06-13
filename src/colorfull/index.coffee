fs = require('fs')
basePath = "#{__dirname}/../.."
ejs = require('ejs')

module.exports = ->
  fs.mkdirSync "#{basePath}/colorfull" until fs.existsSync("#{basePath}/colorfull")
  fs.writeFileSync "#{basePath}/colorfull/index.html", 
    ejs.render fs.readFileSync("#{__dirname}/index.ejs", "utf-8")
