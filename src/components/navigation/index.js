import React from 'react'
import {Link} from 'react-router'
import cx from 'classnames'

export default class Navigation extends React.Component {
  constructor () {
    super()
    this.state = {components: window.__components}
  }

  render () {
    return (
      <nav className='sui-StudioNav' >
        <input className='sui-StudioNav-searchInput' type='text' placeholder='Search' />
        <ul className='sui-StudioTabs sui-StudioTabs--vertical'>
          <li onClick={this.props.handleClick} className='sui-StudioTabs-tab'>
            <Link
              className='sui-StudioTabs-link'
              to='/'
              onClick={this.props.handleClick}
            >Home</Link>
          </li>
          {
            this.state.components.map((link, index) => {
              const {category, component} = link
              return (
                <li key={index} onClick={this.props.handleClick} className='sui-StudioTabs-tab'>
                  <Link
                    className='sui-StudioTabs-link'
                    activeClassName="sui-StudioTabs-link--active"
                    to={`/workbench/${category}/${component}/`}
                  >
                    <span className="sui-StudioTabs-label">{category} / </span><strong>{component}</strong>
                  </Link>
                </li>
              )
            })
          }
        </ul>
        <div className='sui-StudioNav-logo'>
          <svg id='SUI-Engineers'  xmlns='http://www.w3.org/2000/svg' viewBox='0 0 470 340.6'>
            <path fill='#e30613' d='M129.6 170.3c0-58.6 29.6-110.2 74.6-140.8L155.5 1.8c-4.2-2.4-9.3-2.3-13.5.1L6.7 81.2C2.5 83.6 0 88.1 0 92.9v156.9c0 4.8 2.6 9.2 6.8 11.6l137.4 77.5c4.2 2.3 9.4 2.3 13.6-.2l46.7-27.4c-45.2-30.6-74.9-82.3-74.9-141z' />
            <path fill='#009fe3' d='M299.8.1c-35.4 0-68.3 10.8-95.6 29.4l87.7 49.8c4.2 2.4 6.8 6.8 6.8 11.6l1.1 156.8c0 4.8-2.5 9.3-6.7 11.7l-88.6 51.9c27.2 18.4 60 29.2 95.3 29.2 94 0 170.2-76.2 170.2-170.2S393.8.1 299.8.1z' />
            <path fill='#000411' d='M299.8 247.7l-1.1-156.8c0-4.8-2.6-9.2-6.8-11.6l-87.7-49.8c-45 30.6-74.6 82.3-74.6 140.8 0 58.7 29.7 110.4 74.9 141l88.6-51.9c4.2-2.4 6.7-6.9 6.7-11.7z' />
          </svg>
        </div>
      </nav>
    )
  }
}
