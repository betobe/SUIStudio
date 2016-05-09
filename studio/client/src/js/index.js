import React from 'react'
import reactDOM from 'react-dom'
import Preview from './preview'
// import loadScript from './libs/load-scripts'

const HelloComponent = `
  const Hello = () => <h1>Hola Mundo</h1>
  return <Hello />
`
// loadScript('localhost:3001/bundler/components/autocompleted/sui-autocompleted')
reactDOM.render(<Preview code={HelloComponent} />, document.body)
