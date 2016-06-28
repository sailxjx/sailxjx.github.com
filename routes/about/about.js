import React from 'react'
import CSSModules from 'react-css-modules'
import aboutArticle from './index.md'
import Header from '../../components/header'
import Article from '../../components/article'
import styles from '../../components/app/app.styl'

class About extends React.Component {
  render () {
    return <div styleName='root'>
      <Header />
      <Article article={aboutArticle} />
    </div>
  }
}

export default CSSModules(About, styles)
