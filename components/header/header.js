/* eslint-disable jsx-quotes */
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './header.styl'
import Navigation from '../navigation'

class Header extends React.Component {
  render () {
    return <header styleName='root'>
      <div styleName='brand'>CodeBean</div>
      <Navigation />
    </header>
  }
}

export default CSSModules(Header, styles)
