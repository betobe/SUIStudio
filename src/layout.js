import React from 'react'
import ReactMarkdown from 'react-markdown'

import Navigation from './components/navigation'

const readme = require(`raw!${__BASE_DIR__}/components/README.md`)

export default class Layout extends React.Component {
  render () {
    const {children} = this.props
    return (
      <div className='SUIStudio'>
        <Navigation />
        <div className='SUIStudio-workbench'>
          {children !== null ? children : <ReactMarkdown source={readme} />}
        </div>
      </div>
    )
  }
}
