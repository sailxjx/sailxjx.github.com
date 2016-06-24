import React from 'react'
import CSSModules from 'react-css-modules'
import homeArticle from './index.md'
import Header from '../../components/header'
import Article from '../../components/article'
import styles from '../../components/app/app.styl'

class Home extends React.Component {
  render () {
    return <div styleName='root'>
      <Header />
      <Article article={homeArticle} />
    </div>
  }
}

export default CSSModules(Home, styles)
