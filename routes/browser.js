/* eslint-disable jsx-quotes */
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import About from './about'
import Project from './project'
import Paint from './paint'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={About} />
    <Route path="/project" component={Project} />
    <Route path="/paint" component={Paint} />
  </Router>
), document.getElementById('app'))
