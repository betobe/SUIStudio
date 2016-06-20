import React from 'react'
import ReactMarkdown from 'react-markdown'

const tryRequire = ({category, name, component}) => {
  const reqComponentsReadme = require.context('raw!./../../../../../src', true, /^.*\/README\.md?/)

  let readme
  try {
    readme = reqComponentsReadme(`./${category}/${name}/${component}/README.md`)
  } catch (e) {
    readme = `### ${category}/${name}/${component} no tiene README`
  }
  return readme
}

export default class Documentation extends React.Component {
  render () {
    const {category, name, component} = this.props.params
    const readme = tryRequire({category, name, component})

    return (
      <div className='SUIStudioDocumentation'>
        <ReactMarkdown source={readme} />
      </div>
    )
  }
}
