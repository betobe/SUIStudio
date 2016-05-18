import React from 'react'
import {Link} from 'react-router'

export default class Workbench extends React.Component {
  render () {
    const {category, name, component} = this.props.params
    return (
      <div className='SUIStudioWorkbench'>
        <nav className='SUIStudioWorkbench-navigation'>
          <ul className='SUIStudioWorkbench-navContainer'>
            <li className='SUIStudioWorkbench-link'><Link to={`/workbench/${category}/${name}/${component}/demo`}>Demo</Link></li>
            <li className='SUIStudioWorkbench-link'><Link to={`/workbench/${category}/${name}/${component}/documentation`}>Documentation</Link></li>
          </ul>
        </nav>
        <div className='SUIStudioWorkbench-content'>{this.props.children}</div>
      </div>
    )
  }
}
