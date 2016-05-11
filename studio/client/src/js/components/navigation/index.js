import React from 'react'
import {Link} from 'react-router'

export default class Navigation extends React.Component {
  render () {
    return (
      <aside>
        <Link to='/'>Home</Link>
        <Link to='/workbench/components/autocompleted/sui-autocompleted'>sui-autocompleted</Link>
      </aside>
    )
  }
}

