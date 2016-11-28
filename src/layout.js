import React from 'react'
import ReactMarkdown from 'react-markdown'

import Navigation from './components/navigation'

const readme = require(`raw!${__BASE_DIR__}/components/README.md`)

export default class Layout extends React.Component {
  render () {
    const {children} = this.props
    return (
      <div className='SUIStudio'>
        <div className='SUIStudio-sidebar'>
          <Navigation />
        </div>
        <div className='SUIStudio-main'>
          {children !== null ? children : <ReactMarkdown source={readme} />}
        </div>
      </div>
    )
  }
}
