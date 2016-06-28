/* eslint-disable jsx-quotes */
import React from 'react'
import CSSModules from 'react-css-modules'
import paintArticle from './paint.md'
import Header from '../../components/header'
import Article from '../../components/article'
import '../../components/app/app.styl'
import styles from './paint.styl'

class Paint extends React.Component {
  render () {
    return <div styleName="root">
      <Header />
      <Article article={paintArticle} />
    </div>
  }
}

export default CSSModules(Paint, styles)
