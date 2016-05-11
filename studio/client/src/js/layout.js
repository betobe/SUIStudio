import React from 'react'

import Navigation from './components/navigation'

export default class Layout extends React.Component {
  render () {
    const {children} = this.props
    return (
      <div>
        <Navigation />
        {children !== undefined ? children : <h1>Selecciona un componente</h1>}
      </div>
    )
  }
}

