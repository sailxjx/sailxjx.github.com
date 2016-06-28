/* eslint-disable jsx-quotes */
import React from 'react'
import CSSModules from 'react-css-modules'
import projectArticle from './project.md'
import Header from '../../components/header'
import Article from '../../components/article'
import styles from '../../components/app/app.styl'

class Project extends React.Component {
  render () {
    return <div styleName="root">
      <Header />
      <Article article={projectArticle} />
    </div>
  }
}

export default CSSModules(Project, styles)
