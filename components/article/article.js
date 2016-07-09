import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './article.styl'

class Article extends Component {
  render () {
    return <div styleName='root'>{this.props.children}</div>
  }
}

Article.propTypes = {
  children: PropTypes.element.isRequired
}

export default CSSModules(Article, styles)
