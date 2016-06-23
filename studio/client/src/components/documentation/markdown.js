import React from 'react'
import ReactMarkdown from 'react-markdown'

import tryRequire from './try-require'

const Markdown = ({params}) => {
  const [_, readme] = tryRequire(params) // eslint-disable-line

  return (
    <ReactMarkdown source={readme} />
  )
}

Markdown.displayName = 'Markdown'

export default Markdown
