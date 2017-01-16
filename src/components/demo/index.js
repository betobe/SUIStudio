import React from 'react'
import cx from 'classnames'

import Preview from '../preview'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'

import tryRequire from './try-require'
import ContextButtons from './ContextButtons'
import RoutesButtons from './RoutesButtons'
import contextify from '../contextify'
import {matchPattern, compilePattern} from 'react-router/lib/PatternUtils' // Thx for that!
import deepmerge from 'deepmerge'

const DEFAULT_CONTEXT = 'default'
const EVIL_HACK_TO_RERENDER_AFTER_CHANGE = ' '

const contextByType = (ctxt, type) => deepmerge(ctxt[DEFAULT_CONTEXT], ctxt[type])
const isFunction = (fnc) => !!(fnc && fnc.constructor && fnc.call && fnc.apply)

export default class Demo extends React.Component {
  static bootstrapWith (demo, {category, component}) {
    tryRequire({category, component}).then(([Component, playground, ctxt, routes]) => {
      if (routes) { compilePattern(routes.pattern) }
      if (isFunction(ctxt)) {
        return ctxt().then(context => demo.setState({playground, Component, ctxt: context, routes}))
      }

      demo.setState({playground, Component, ctxt, routes})
    })
  }

  static propsWithParams (demo) {
    if (demo.state.routes && demo.props.params && demo.props.params.splat) {
      const matches = matchPattern(demo.state.routes.pattern, `/${demo.props.params.splat}`)
      const params = matches.paramNames.reduce((params, name, index) => {
        params[name] = matches.paramValues[index]
        return params
      }, {})
      return Object.assign(
        {},
        {'__v': Math.random()},
        demo.props,
        {
          routeParams: params,
          params: Object.assign(
            {},
            demo.props.params,
            params
          )
        }
      )
    }
    return demo.props
  }

  constructor (props, context) {
    super(props, context)
    this.state = {Component: (<div />), playground: 'NO_CODE', ctxt: false, ctxtType: 'default', routes: false, codeOpen: false}
  }

  componentDidMount () {
    Demo.bootstrapWith(this, this.props.params)
  }

  componentWillReceiveProps (nextProps) {
    Demo.bootstrapWith(this, nextProps.params)
  }

  render () {
    const {category, component} = this.props.params
    let {Component, playground, ctxt, ctxtType, routes, codeOpen} = this.state
    if (Component.contextTypes && ctxt) {
      Component = contextify(Component.contextTypes, contextByType(ctxt, ctxtType))(Component)
    }

    /* Begin Black Magic */
    // We want pass the routering props to the component in the demo
    const self = this
    const HOCComponent = class HOCComponent extends React.Component {
      render () { return (<Component {...Demo.propsWithParams(self)} {...this.props} />) }
    }
    HOCComponent.displayName = Component.displayName
    /* END Black Magic */

    const codeClassName = cx('SUIStudioDemo-code', {
      'is-open': codeOpen
    })
    return (
      <div className='SUIStudioDemo'>
        <button className='SUIStudioDemo-codeButton' onClick={this.handleCode.bind(this)}>{'< />'}</button>
        <div className={codeClassName}>
          <Codemirror
            value={playground}
            onChange={(playground) => this.setState({playground})}
            options={{mode: 'javascript', lineNumbers: true, theme: 'material'}}
          />
        </div>
        <div className='SUIStudioDemo-buttons'>
          <ContextButtons ctxt={ctxt} onContextChange={this.handleContextChange.bind(this)} />
          <RoutesButtons routes={routes} category={category} component={component} />
        </div>
        <div className='SUIStudioDemo-preview'>
          <Preview
            code={playground}
            scope={{React, [`${Component.displayName || Component.name}`]: HOCComponent}}
          />
        </div>
      </div>
    )
  }

  handleCode () {
    this.setState({codeOpen: !this.state.codeOpen})
  }

  handleContextChange (ctxtType) {
    this.setState({ctxtType, playground: this.state.playground + EVIL_HACK_TO_RERENDER_AFTER_CHANGE})
  }

  handleRoutering () {
    this.setState({playground: this.state.playground + EVIL_HACK_TO_RERENDER_AFTER_CHANGE})
  }
}
