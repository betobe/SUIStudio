import React from 'react'
import {Link} from 'react-router'

export default class Navigation extends React.Component {
  render () {
    return (
      <nav className='SUIStudioNav'>
        <ul>
          <li className='SUIStudioNav-link'><Link to='/'>Home</Link></li>
          <li className='SUIStudioNav-link'><Link to='/workbench/components/autocompleted/sui-autocompleted'>sui-autocompleted</Link></li>
        </ul>
      </nav>
    )
  }
}

