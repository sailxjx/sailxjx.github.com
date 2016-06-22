'use strict'
require('babel-core/register')
const Koa = require('koa')
const logger = require('koa-logger')
const webpack = require('webpack')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const fallback = require('connect-history-api-fallback')({index: '/index.html'})

const webpackConfig = require('./tools/webpack.config')

const compiler = webpack(webpackConfig)
const app = Koa()

require('koa-ejs')(app, {
  root: __dirname,
  layout: false,
  viewExt: 'html',
  cache: false
})

app.use(logger())
app.use(function * (next) {
  fallback(this, null, function () {})
  yield next
})
app.use(devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(hotMiddleware(compiler))

app.listen(3001, function () {
  console.log('Listening on 3001...')
})

module.exports = app
