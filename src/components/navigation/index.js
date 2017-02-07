import React from 'react'
import {Link} from 'react-router'

export default class Navigation extends React.Component {
  constructor () {
    super()
    this.state = {components: window.__components}
  }

  render () {
    return (
      <nav id='drawer' className='SUIStudioNav'>
        <ul className='SUIStudioNav-list'>
          <li onClick={this.props.handleClick}><Link className='SUIStudioNav-link' to='/'>Home</Link></li>
          {
            (this.state.components || []).map((link, index) => {
              const {category, component} = link
              return (
                <li key={index} onClick={this.props.handleClick}>
                  <Link
                    className='SUIStudioNav-link'
                    to={`/workbench/${category}/${component}`}
                  >{`${category}/${component}`}</Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
    )
  }
}
