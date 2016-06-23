import React from 'react'

import Preview from '../preview'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'

import tryRequire from './try-require'
import contextify from '../contextify'
import deepmerge from 'deepmerge'

const DEFAULT_CONTEXT = 'default'
const EVIL_HACK_TO_RERENDER_AFTER_CTXT_CHANGE = ' '

const contextByType = (ctxt, type) => deepmerge(ctxt[DEFAULT_CONTEXT], ctxt[type])

export default class Demo extends React.Component {
  static bootstrapWith (demo, {category, name, component}) {
    const [Component, playground, ctxt] = tryRequire({category, name, component})
    demo.setState({playground, Component, ctxt})
  }
  constructor (props, context) {
    super(props, context)
    this.state = {Component: (<div></div>), playground: 'NO_CODE', ctxt: false, ctxtType: 'default'}
  }

  componentDidMount () {
    Demo.bootstrapWith(this, this.props.params)
  }

  componentWillReceiveProps (nextProps) {
    Demo.bootstrapWith(this, nextProps.params)
  }

  render () {
    let {Component, playground, ctxt, ctxtType} = this.state
    if (Component.contextTypes && ctxt) {
      Component = contextify(Component.contextTypes, contextByType(ctxt, ctxtType))(Component)
    }
    return (
      <div className='SUIStudioDemo'>
        {
          Object.keys(ctxt).map(
            (ctxtType, index) =>
              <button className='SUIStudioDemo-context' key={index} onClick={this.handleContextChange.bind(this, ctxtType)}>{ctxtType}</button>
          )
        }
        <Preview
          code={playground}
          scope={{React, [`${this.state.Component.displayName || Component.name}`]: Component}} />
        <Codemirror value={playground} onChange={this.updateCode.bind(this)} options={{mode: 'javascript', lineNumbers: true}} />
      </div>
    )
  }

  updateCode (playground) {
    this.setState({playground})
  }

  handleContextChange (ctxtType, event) {
    event.preventDefault()
    this.setState({ctxtType, playground: this.state.playground + EVIL_HACK_TO_RERENDER_AFTER_CTXT_CHANGE})
  }
}
