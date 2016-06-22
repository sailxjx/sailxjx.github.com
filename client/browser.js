'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
const Main = React.createFactory(require('./main.jsx'))

ReactDOM.render(Main(), document.getElementById('app'))
