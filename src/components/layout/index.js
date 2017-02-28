import React from 'react'
import ReactMarkdown from 'react-markdown'
import Navigation from '../navigation'
import cx from 'classnames'

const readme = require(`raw-loader!${__BASE_DIR__}/components/README.md`)

export default class Layout extends React.Component {

  constructor (props, context) {
    super(props, context)

    this.handleClick = this.handleClick.bind(this)
    this.state = {isOpen: false}
  }

  setHoverState (value) {
    this.setState({isMouseOver: value})
  }

  handleClick () {
    this.setState({isOpen: !this.state.isOpen})
  }

  render () {
    const {children} = this.props
    const {isOpen} = this.state
    return (
      <div className='sui-Studio'>
        <div
          onMouseOver={this.setHoverState.bind(this, true)}
          onMouseOut={this.setHoverState.bind(this, false)}
          className={cx({
            'sui-Studio-sidebar': true,
            'sui-Studio-sidebar--hover': this.state.isMouseOver,
            'sui-Studio-sidebar--fixed': this.state.isOpen
          })}
        >
          <div className='sui-Studio-sidebarBody'>
            <input className='sui-Studio-toggle' type='checkbox' id='drawer-toggle' checked={isOpen} onChange={this.handleClick} name='drawer-toggle' />
            <label className='sui-Studio-navIcon' htmlFor='drawer-toggle' id='drawer-toggle-label'></label>
            <Navigation />
          </div>
        </div>
        <div className='sui-Studio-main'>
          {
            children !== null ? children : this._mainReadme
          }
        </div>
      </div>
    )
  }

  get _mainReadme () {
    return (
      <div className='sui-Studio-readme'>
        <header className='sui-Studio-header'>SUIComponents</header>
        <ReactMarkdown source={readme} />
      </div>
    )
  }
}
