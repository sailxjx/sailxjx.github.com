/* eslint-disable jsx-quotes */
import React from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import styles from './navigation.styl'

class Navigation extends React.Component {
  render () {
    let navs = [
      <Link styleName="nav-btn" to="/">ABOUT</Link>,
      <a styleName="nav-btn" href="/blog">BLOG</a>,
      <Link styleName="nav-btn" to="/project">PROJECT</Link>,
      <Link styleName="nav-btn" to="/paint">PAINT</Link>
    ]
    let rows = navs.map((nav) => {
      return <li styleName="nav-ele">
        <div styleName="verticl-bar" />
        <div styleName="nav-handler">
          <div styleName="nav-dot-wrapper">
            <div styleName="nav-dot" />
          </div>
          {nav}
        </div>
      </li>
    })
    // Push last verticl-bar
    rows.push(<li styleName="nav-ele">
      <div styleName="verticl-bar" />
    </li>)
    return <nav styleName="root">
      <ul styleName="nav-list">
        {rows}
      </ul>
    </nav>
  }
}

export default CSSModules(Navigation, styles)
