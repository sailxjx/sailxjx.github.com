/* eslint-disable jsx-quotes */
import React from 'react'
import CSSModules from 'react-css-modules'
import Modal from 'react-modal'
import styles from './album.styl'

class Album extends React.Component {
  constructor () {
    super()
    this.state = {
      modalIsOpen: false,
      largeImage: undefined
    }
    this.showLargeImage = this.showLargeImage.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  showLargeImage (image) {
    this.setState({
      modalIsOpen: true,
      largeImage: image
    })
  }

  closeModal () {
    this.setState({modalIsOpen: false})
  }

  render () {
    let largeImage = this.state.largeImage ? <img src={this.state.largeImage}/> : ''
    return <div styleName="album">
      {this.props.images.map((image) => {
        return <div styleName="image-container">
          <a styleName="image-hover" onClick={() => {
            this.showLargeImage(image)
          }}>
            <img src={image}/>
          </a>
        </div>
      })}
      <Modal isOpen={this.state.modalIsOpen} >
        <div styleName="close-aligner">
          <a styleName="close" onClick={this.closeModal}>
          </a>
        </div>
        {largeImage}
      </Modal>
    </div>
  }
}

Album.propTypes = {
  images: React.PropTypes.array
}

export default CSSModules(Album, styles)
