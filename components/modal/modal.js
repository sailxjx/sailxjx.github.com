/* eslint-disable jsx-quotes */
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './modal.styl'

class Modal extends React.Component {
  constructor (props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
    this.state = {
      opened: true
    }
  }

  closeModal () {
    this.setState({opened: false})
  }

  render () {
    let rootStyleName = this.state.opened ? 'root' : 'root-hidden'
    return <div styleName={rootStyleName}>
      <div styleName="close-aligner">
        <a styleName="close" onClick={this.closeModal}>
        </a>
      </div>
      <div styleName="container-aligner">
        <div styleName="container"></div>
      </div>
    </div>
  }
}

export default CSSModules(Modal, styles)
