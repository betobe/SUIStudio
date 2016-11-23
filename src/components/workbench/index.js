import React from 'react'
import {Link} from 'react-router'

export default class Workbench extends React.Component {
  render () {
    const {category, component} = this.props.params
    return (
      <div className='SUIStudioWorkbench'>
        <nav className='SUIStudioWorkbench-navigation'>
          <ul className='SUIStudioWorkbench-navContainer'>
            <li className='SUIStudioWorkbench-link'><Link to={`/workbench/${category}/${component}/demo`}>Demo</Link></li>
            <li className='SUIStudioWorkbench-link'><Link to={`/workbench/${category}/${component}/documentation`}>Documentation</Link></li>
            <li className='SUIStudioWorkbench-link'><Link to={`/workbench/${category}/${component}/tests`}>Tests</Link></li>
          </ul>
        </nav>
        <div className='SUIStudioWorkbench-content'>{this.props.children}</div>
      </div>
    )
  }
}
