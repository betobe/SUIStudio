/* global __BASE_DIR__ */

import React, {PropTypes} from 'react'
import ReactMarkdown from 'react-markdown'
import Navigation from '../navigation'
import cx from 'classnames'

const readme = require(`raw-loader!${__BASE_DIR__}/components/README.md`)

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  constructor (props, context) {
    super(props, context)
    this.clickHandler = this.handleClick.bind(this)
    this.navigationClickHandler = this.handleNavigationClick.bind(this)
    this.state = {isOpen: false}
  }

  handleClick () {
    this.setState({isOpen: !this.state.isOpen})
  }

  handleNavigationClick () {
    if (this.overlayElement.clientWidth) {
      this.setState({isOpen: false})
    }
  }

  render () {
    const {children} = this.props
    const {isOpen} = this.state
    return (
      <div className='sui-Studio'>
        <div className={cx({
          'sui-Studio-sidebar': true,
          'sui-Studio-sidebar--open': this.state.isOpen
        })} >
          <div className='sui-Studio-sidebarBody'>
            <input className='sui-Studio-toggle' type='checkbox' id='drawer-toggle' checked={isOpen} onChange={this.clickHandler} name='drawer-toggle' />
            <label className='sui-Studio-navIcon' htmlFor='drawer-toggle' id='drawer-toggle-label' />
            <Navigation
              handleClick={this.navigationClickHandler}
              handleSearch={() => { this.setState({isOpen: true}) }}
            />
          </div>
        </div>
        <div
          className='sui-Studio-sidebarOverlay'
          ref={(div) => { this.overlayElement = div }}
          onClick={this.clickHandler}
        />
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
