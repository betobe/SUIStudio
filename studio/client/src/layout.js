import React from 'react'

import Navigation from './components/navigation'

export default class Layout extends React.Component {
  render () {
    const {children} = this.props
    return (
      <div className='SUIStudio'>
        <Navigation />
        <div className='SUIStudio-workbench'>
          {children !== undefined ? children : <h1>Selecciona un componente</h1>}
        </div>
      </div>
    )
  }
}

