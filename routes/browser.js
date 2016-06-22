'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import index from './index.jsx'

const Main = React.createFactory(index)

ReactDOM.render(Main(), document.getElementById('app'))
