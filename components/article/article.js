import React, {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './article.styl'

class Article extends Component {

  static propTypes = {
    article: PropTypes.element.isRequired
  }

  render () {
    return <div styleName='root'>{this.props.article}</div>
  }
}

export default CSSModules(Article, styles)
