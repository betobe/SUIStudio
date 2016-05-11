import React from 'react'
import {Link} from 'react-router'

export default class Workbench extends React.Component {
  render () {
    const {category, name, component} = this.props.params
    return (
      <div className='SUIStudioWorkbench'>
        <nav class='SUIStudioWorkbench-navigation'>
          <ul class='SUIStudioWorkbench-navContainer'>
            <li class='SUIStudioWorkbench-link'><Link to={`/workbench/${category}/${name}/${component}/demo`}>Demo</Link></li>
            <li class='SUIStudioWorkbench-link'><Link to={`/workbench/${category}/${name}/${component}/documentation`}>Documentation</Link></li>
          </ul>
        </nav>
        <div class='SUIStudioWorkbench-content'>{this.props.children}</div>
      </div>
    )
  }
}
