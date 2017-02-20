import React from 'react'
import cx from 'classnames'

import Preview from '../preview'
import Style from '../style'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'

import tryRequire from './try-require'
import stylesFor, {themesFor} from './fetch-styles'
import ContextButtons from './ContextButtons'
import RoutesButtons from './RoutesButtons'
import ThemesButtons from './ThemesButtons'
import contextify from '../contextify'
import {matchPattern, compilePattern} from 'react-router/lib/PatternUtils' // Thx for that!
import deepmerge from 'deepmerge'

const DEFAULT_CONTEXT = 'default'
const EVIL_HACK_TO_RERENDER_AFTER_CHANGE = ' '

const contextByType = (ctxt, type) => deepmerge(ctxt[DEFAULT_CONTEXT], ctxt[type])
const isFunction = (fnc) => !!(fnc && fnc.constructor && fnc.call && fnc.apply)

export default class Demo extends React.Component {
  static bootstrapWith (demo, {category, component, style, themes}) {
    tryRequire({category, component}).then(([Component, playground, ctxt, routes]) => {
      if (routes) { compilePattern(routes.pattern) }
      if (isFunction(ctxt)) {
        return ctxt().then(context => {
          demo.setState({playground, Component, ctxt: context, routes, style, themes})
        })
      }

      demo.setState({playground, Component, ctxt, routes, style, themes})
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
    this.state = {
      Component: (<div />),
      playground: 'NO_CODE',
      ctxt: false,
      ctxtType: 'default',
      ctxtSelectedIndex: 0,
      themes: [],
      theme: 'default',
      themeSelectedIndex: -1,
      routes: false,
      codeOpen: false
    }
  }

  componentDidMount () {
    const {category, component} = this.props.params
    stylesFor({category, component}).then(style => {
      const themes = themesFor({category, component})
      Demo.bootstrapWith(this, {category, component, style, themes})
    })
  }

  componentWillReceiveProps (nextProps) {
    const {category, component} = nextProps.params
    stylesFor({category, component}).then(style => {
      const themes = themesFor({category, component})
      Demo.bootstrapWith(this, {category, component, style, themes})
    })
  }

  render () {
    const {category, component} = this.props.params
    let {
      Component,
      codeOpen,
      ctxt,
      ctxtSelectedIndex,
      ctxtType,
      playground,
      routes,
      themeSelectedIndex,
      themes,
      style
    } = this.state
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
        <Style>{style}</Style>
        <button className='SUIStudioDemo-codeButton' onClick={this.handleCode.bind(this)}>{'< />'}</button>
        <div className={codeClassName}>
          <Codemirror
            value={playground}
            onChange={(playground) => this.setState({playground})}
            options={{mode: 'javascript', lineNumbers: true, theme: 'material'}}
          />
        </div>
        <div className='SUIStudioDemo-buttons'>
          <ContextButtons
            ctxt={ctxt}
            selected={ctxtSelectedIndex}
            onContextChange={this.handleContextChange.bind(this)} />
          <ThemesButtons
            themes={themes}
            selected={themeSelectedIndex}
            onThemeChange={this.handleThemeChange.bind(this)} />
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

  handleContextChange (ctxtType, index) {
    this.setState({
      ctxtType,
      ctxtSelectedIndex: index,
      playground: this.state.playground + EVIL_HACK_TO_RERENDER_AFTER_CHANGE
    })
  }

  handleThemeChange (theme, index) {
    const {category, component} = this.props.params
    stylesFor({category, component, withTheme: theme}).then(style => {
      this.setState({
        style,
        theme,
        themeSelectedIndex: index
      })
    })
  }

  handleRoutering () {
    this.setState({playground: this.state.playground + EVIL_HACK_TO_RERENDER_AFTER_CHANGE})
  }
}
