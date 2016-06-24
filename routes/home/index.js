import React from 'react'
import './index.css'
import homeBody from './index.md'
import Navigation from '../../components/navigation'

export default class Home extends React.Component {
  render () {
    return <div>
      <Navigation />
      <div dangerouslySetInnerHTML={{__html: homeBody}}></div>
    </div>
  }
}
