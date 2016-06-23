import React from 'react'
import {Link} from 'react-router'

export default class Documentation extends React.Component {
  render () {
    const {category, name, component} = this.props.params

    return (
      <div className='SUIStudioDocumentation'>
        <nav className='SUIStudioDocumentation-navigation'>
          <ul className='SUIStudioDocumentation-navContainer'>
            <li className='SUIStudioDocumentation-link'>
              <Link to={`/workbench/${category}/${name}/${component}/documentation/generate`}>Generate</Link>
            </li>
            <li className='SUIStudioDocumentation-link'>
              <Link to={`/workbench/${category}/${name}/${component}/documentation/readme`}>Readme</Link>
            </li>
          </ul>
        </nav>
        <div className='SUIStudioDocumentation-content'>{this.props.children}</div>
      </div>
    )
  }
}
