import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export default class Workbench extends React.Component {
  propTypes = {
    children: PropTypes.element,
    params: PropTypes.shape({
      category: PropTypes.string,
      component: PropTypes.string
    })
  }

  render () {
    const {category, component} = this.props.params
    const TAB_CLASS = 'sui-StudioTabs-tab'
    const LINK_CLASS = 'sui-StudioTabs-link'
    const ACTIVE_CLASS = LINK_CLASS + '--active'

    return (
      <div className='sui-StudioWorkbench'>
        <nav className='sui-StudioWorkbench-navigation'>
          <ul className='sui-StudioTabs sui-StudioTabs--horizontal'>
            <li className={TAB_CLASS}>
              <Link to={`/workbench/${category}/${component}/demo`} className={LINK_CLASS} activeClassName={ACTIVE_CLASS} >Demo</Link>
            </li>
            <li className={TAB_CLASS}>
              <Link to={`/workbench/${category}/${component}/documentation`} className={LINK_CLASS} activeClassName={ACTIVE_CLASS} >Documentation</Link>
            </li>
            <li className={TAB_CLASS}>
              <Link to={`/workbench/${category}/${component}/tests`} className={LINK_CLASS} activeClassName={ACTIVE_CLASS} >Tests</Link>
            </li>
          </ul>
        </nav>
        <div className='sui-StudioWorkbench-content'>{this.props.children}</div>
      </div>
    )
  }
}
