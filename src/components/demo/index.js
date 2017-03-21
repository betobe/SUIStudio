/* eslint react/no-multi-comp:0 */
import React, {PropTypes} from 'react'
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
import EventsButtons from './EventsButtons'
import contextify from '../contextify'
import {matchPattern, compilePattern} from 'react-router/lib/PatternUtils' // Thx for that!
import deepmerge from 'deepmerge'

const DEFAULT_CONTEXT = 'default'
const EVIL_HACK_TO_RERENDER_AFTER_CHANGE = ' '

const contextByType = (ctxt, type) => deepmerge(ctxt[DEFAULT_CONTEXT], ctxt[type])
const isFunction = (fnc) => !!(fnc && fnc.constructor && fnc.call && fnc.apply)

export default class Demo extends React.Component {
  static bootstrapWith (demo, {category, component, style, themes}) {
    tryRequire({category, component}).then(([Component, playground, ctxt, routes, events]) => {
      if (routes) { compilePattern(routes.pattern) }
      if (isFunction(ctxt)) {
        return ctxt().then(context => {
          demo.setState({playground, Component, ctxt: context, routes, style, themes, events})
        })
      }

      demo.setState({playground, Component, ctxt, routes, style, themes, events})
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

  static propTypes = {
    category: PropTypes.string,
    component: PropTypes.string,
    params: PropTypes.shape({
      category: PropTypes.string,
      component: PropTypes.string
    })
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
      events,
      playground,
      routes,
      style,
      themeSelectedIndex,
      themes,
    } = this.state
    let domain

    if (Component.contextTypes && ctxt) {
      Component = contextify(Component.contextTypes, contextByType(ctxt, ctxtType))(Component)
    }

    if (events && ctxt && ctxtType) {
      domain = contextByType(ctxt, ctxtType).domain
    }

    /* Begin Black Magic */
    // We want pass the routering props to the component in the demo
    const self = this
    const HOCComponent = class HOCComponent extends React.Component {
      render () { return (<Component {...Demo.propsWithParams(self)} {...this.props} />) }
    }
    HOCComponent.displayName = Component.displayName
    /* END Black Magic */

    const codeClassName = cx('sui-StudioDemo-code', {
      'sui-StudioDemo-code--open': codeOpen
    })

    return (
      <div className='sui-StudioDemo'>
        <Style>{style}</Style>
        <div className='sui-StudioNavBar-secondary'>
          <ContextButtons
            ctxt={ctxt}
            selected={ctxtSelectedIndex}
            onContextChange={this.handleContextChange} />
          <ThemesButtons
            themes={themes}
            selected={themeSelectedIndex}
            onThemeChange={this.handleThemeChange} />
          <RoutesButtons routes={routes} category={category} component={component} />
          <EventsButtons events={events} domain={domain} />
        </div>
        <div className='sui-StudioDemo-codeButton' onClick={this.handleCode}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 10.199l-3.64 1.801 3.64 1.796v2.204l-6-2.935v-2.131l6-2.934v2.199zm8 2.866l-6 2.935v-2.204l3.64-1.796-3.64-1.801v-2.199l6 2.935v2.13z' />
          </svg>
        </div>
        <div className={codeClassName}>
          <Codemirror
            value={playground}
            onChange={(playground) => this.setState({playground})}
            options={{mode: 'javascript', lineNumbers: true, theme: 'material'}}
          />
        </div>
        <div className='sui-StudioDemo-preview'>
          <Preview
            code={playground}
            scope={{React, [`${Component.displayName || Component.name}`]: HOCComponent}}
          />
        </div>
      </div>
    )
  }

  handleCode = () => {
    this.setState({codeOpen: !this.state.codeOpen})
  }

  handleContextChange = (ctxtType, index) => {
    this.setState({
      ctxtType,
      ctxtSelectedIndex: index,
      playground: this.state.playground + EVIL_HACK_TO_RERENDER_AFTER_CHANGE
    })
  }

  handleThemeChange = (theme, index) => {
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
