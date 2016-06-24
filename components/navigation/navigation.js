/* eslint-disable jsx-quotes */
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './navigation.styl'

class Navigation extends React.Component {
  render () {
    let navs = ['about', 'blog', 'projects', 'paints']
    let rows = navs.map((nav, i) => {
      let href = '/' + nav
      if (i === 0) href = '/'
      return <li styleName='nav-ele'>
        <div styleName='verticl-bar'></div>
        <div styleName='nav-handler'>
          <div styleName='nav-dot-wrapper'>
            <div styleName='nav-dot'></div>
          </div>
          <a styleName='nav-btn' href={href}>{nav.toUpperCase()}</a>
        </div>
      </li>
    })
    // Push last verticl-bar
    rows.push(<li styleName='nav-ele'>
      <div styleName='verticl-bar'></div>
    </li>)
    return <nav styleName='root'>
             <ul styleName='nav-list'>
               {rows}
             </ul>
           </nav>
  }
}

export default CSSModules(Navigation, styles)
