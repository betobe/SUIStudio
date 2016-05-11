import React from 'react'
import ReactMarkdown from 'react-markdown'

const reqComponentsReadme = require.context('raw!./../../../../../src', true, /^.*\/README\.md?/)

export default class Documentation extends React.Component {
  render () {
    const {category, name} = this.props.params
    const readme = reqComponentsReadme(`./${category}/${name}/README.md`)

    return (
      <div className='SUIStudioDocumentation'>
        <ReactMarkdown source={readme} />
      </div>
    )
  }
}
