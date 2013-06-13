fs = require('fs')

taskDirs = [
]

task 'generate', 'generate all source files to readable files', (options) ->
  for dir in taskDirs
    module = require("./src/#{dir}")
    module()
  return false

task 'clean', 'clean all generated files', (options) ->
  for dir in taskDirs
    try
      fs.rmdirSync dir
    catch e
      continue
  console.log 'clean finish'