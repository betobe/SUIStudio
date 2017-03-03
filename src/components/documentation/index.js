import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export default class Documentation extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    params: PropTypes.shape({
      category: PropTypes.string,
      component: PropTypes.string
    })
  }
  render () {
    const {category, component} = this.props.params

    return (
      <div className='sui-StudioDocumentation'>
        <nav className='sui-StudioNavBar-secondary'>
          <ul className=' sui-StudioTabs sui-StudioTabs--horizontal'>
            <li className='sui-StudioTabs-tab'>
              <Link
                to={`/workbench/${category}/${component}/documentation/generate`}
                className='sui-StudioTabs-link'
                activeClassName='sui-StudioTabs-link--active'
              >Generated</Link>
            </li>
            <li className='sui-StudioTabs-tab'>
              <Link
                to={`/workbench/${category}/${component}/documentation/readme`}
                className='sui-StudioTabs-link'
                activeClassName='sui-StudioTabs-link--active'
              >Readme</Link>
            </li>
          </ul>
        </nav>
        <div className='sui-StudioDocumentation-content'>{this.props.children}</div>
      </div>
    )
  }
}
