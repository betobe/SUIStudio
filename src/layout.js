import React from 'react'
import ReactMarkdown from 'react-markdown'

import Navigation from './components/navigation'

const readme = require(`raw!${__BASE_DIR__}/components/README.md`)

export default class Layout extends React.Component {

  constructor (props, context) {
    super(props, context)

    this.handleClick = this.handleClick.bind(this)

    this.state = {open: false}
  }

  handleClick () {
    this.setState({open: !this.state.open})
  }

  render () {
    const {children} = this.props
    const {open} = this.state
    return (
      <div className='SUIStudio'>
        <input type='checkbox' id='drawer-toggle' checked={open} onChange={this.handleClick} name='drawer-toggle' />
        <label htmlFor='drawer-toggle' id='drawer-toggle-label'></label>
        <Navigation handleClick={this.handleClick} />
        <div id='page-content' className='SUIStudio-main'>
          {
            children !== null ? children
                              : this._mainReadme
          }
        </div>
      </div>
    )
  }

  get _mainReadme () {
    return (
      <div className='SUIStudio-readme'>
        <header className='SUIStudio-header'>SUIComponents</header>
        <ReactMarkdown source={readme} />
      </div>
    )
  }
}
