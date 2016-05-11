import React from 'react'

const reqComponentsSrc = require.context('./../../../../../../src', true, /^.*\/index\.jsx?/)
const reqComponentsSCSS = require.context('./../../../../../../src', true, /^.*\/index\.scss/)

export default class Workbench extends React.Component {
  render () {
    const {category, name, component} = this.props.params
    reqComponentsSCSS(`./${category}/${name}/index.scss`)
    let Component = reqComponentsSrc(`./${category}/${name}/${component}/index.jsx`).default

    return (
      <Component />
    )
  }
}
