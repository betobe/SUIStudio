import React from 'react'
import {Link} from 'react-router'

export default class Navigation extends React.Component {
  constructor () {
    super()
    this.state = {components: window.__components}
  }

  render () {
    return (
      <nav className='SUIStudioNav'>
        <ul>
          <li className='SUIStudioNav-link'><Link to='/'>Home</Link></li>
          {
            this.state.components.map((link, index) => {
              const {category, component} = link
              return (<li className='SUIStudioNav-link' key={index}><Link to={`/workbench/${category}/${component}`}>{component}</Link></li>)
            })
          }
        </ul>
      </nav>
    )
  }
}

