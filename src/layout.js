import React from 'react'
import ReactMarkdown from 'react-markdown'

import Navigation from './components/navigation'

const readme = require(`raw!${__BASE_DIR__}/components/README.md`)

export default class Layout extends React.Component {
  render () {
    const {children} = this.props
    return (
      <div className='SUIStudio'>
        <input type='checkbox' id='drawer-toggle' name='drawer-toggle' />
        <label htmlFor='drawer-toggle' id='drawer-toggle-label'></label>
        <Navigation />
        <div id='page-content' className='SUIStudio-main'>
          {children !== null ? children : <ReactMarkdown source={readme} />}
        </div>
      </div>
    )
  }
}
