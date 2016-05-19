import React from 'react'

const tryRequire = ({category, name, component}) => {
  const reqComponentsSrc = require.context('./../../../../../src', true, /^.*\/index\.jsx?/)
  const reqComponentsSCSS = require.context('./../../../../../src', true, /^.*\/index\.scss/)
  const noComponent = () => <h1>No Component for {`${category}/${name}/${component}`}</h1>

  let Component
  try {
    Component = reqComponentsSrc(`./${category}/${name}/${component}/index.js`).default
  } catch (e) {
    Component = reqComponentsSrc(`./${category}/${name}/${component}/index.jsx`).default
  }

  try {
    reqComponentsSCSS(`./${category}/${name}/${component}/index.scss`)
  } catch (e) { console.warn(`No styles for ${category}/${name}/${component}`) }

  return Component || noComponent
}

export default class Demo extends React.Component {
  render () {
    const {category, name, component} = this.props.params
    const Component = tryRequire({category, name, component})

    return (
      <div className='SUIStudioDemo'>
        <Component />
      </div>
    )
  }
}
