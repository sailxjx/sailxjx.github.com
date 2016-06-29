/* eslint-disable jsx-quotes */
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './album.styl'

class Album extends React.Component {

  static propTypes = {
    images: React.PropTypes.array,
    showLargeImage: function () {

    }
  }

  render () {
    return <div styleName="album">
      {this.props.images.map((image) => {
        return <div styleName="image-container">
          <a styleName="image-hover" onClick={this.showLargeImage}>
            <img src={image}/>
          </a>
        </div>
      })}
    </div>
  }
}

export default CSSModules(Album, styles)
