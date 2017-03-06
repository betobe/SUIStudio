import React, {PropTypes} from 'react'
import ReactMarkdown from 'react-markdown'

import tryRequire from './try-require'

class Markdown extends React.Component {
  propTypes = {
    params: PropTypes.object
  }

  constructor (props, ctxt) {
    super(props, ctxt)
    this.state = {readme: false}
  }

  componentDidMount () {
    tryRequire(this.props.params).then(([_, readme]) => this.setState({readme}))
  }

  render () {
    const {readme} = this.state
    return readme && <ReactMarkdown className='sui-StudioMarkdown-body markdown-body' source={readme} />
  }
}

Markdown.displayName = 'Markdown'

export default Markdown
