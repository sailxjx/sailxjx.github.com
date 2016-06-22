'use strict'
require('babel-core/register')
const Koa = require('koa')
const router = require('koa-router')()
const logger = require('koa-logger')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const mainView = React.createFactory(require('./client/main.jsx'))

const app = Koa()

require('koa-ejs')(app, {
  root: __dirname,
  layout: false,
  viewExt: 'html',
  cache: false
})

router.get('/', function * () {
  yield this.render('index', {
    content: ReactDOMServer.renderToString(mainView())
  })
})

app.use(logger())
app.use(router.routes())

app.listen(3001, function () {
  console.log('Listening on 3001...')
})

module.exports = app
