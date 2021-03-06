import React, {PropTypes} from 'react'

import tryRequire from './try-require'

var reactDocs = require('react-docgen')

const Methods = ({methods}) => {
  const Params = ({params}) => {
    return (
      <div className='sui-StudioMethods-param'>
        {
          params.map(
            (param, index) => {
              const type = param.type ? `[${param.type ? param.type.name : ''}]` : ''
              return <p key={index} className='sui-StudioMethods-paramName'>{`${param.name} ${type}: ${param.description}`}</p>
            }
          )
        }
      </div>
    )
  }

  Params.propTypes = {params: PropTypes.array}

  return (
    <div className='sui-StudioMethods'>
      <h2 className='sui-StudioMethods-title'>Methods</h2>
      {
        methods.map((method, index) => (
          <div key={index} className='sui-StudioMethods-method'>
            <p className='sui-StudioMethods-methodName'>{`${method.name}: ${method.description || 'Missing description'}`}</p>
            <p className='sui-StudioMethods-methodParams'>Params</p>
            <Params params={method.params} />
            {
              method.description
                ? <p className='sui-StudioMethods-methodReturns'>{`Return: ${method.description}`}</p>
                : null
            }
          </div>
        ))
      }
    </div>
  )
}
Methods.displayName = 'Methods'
Methods.propTypes = {methods: PropTypes.array}

const Props = ({props = {}}) => {
  return (
    <div className='sui-StudioProps'>
      <h2 className='sui-StudioProps-title'>Props</h2>
      {
        Object.keys(props).map(
          (key, index) => {
            const required = props[key].required ? 'Required' : 'Optional'
            const description = props[key].description || 'Missing prop description'
            const type = props[key].type ? props[key].type.name : 'Missing prop type'
            const defaultValue = props[key].defaultValue ? `(${props[key].defaultValue.value})` : ''
            return <p key={index} className='sui-StudioProps-property'>{`${key} [${type}] ${required} ${defaultValue}: ${description}`}</p>
          }
        )
      }
    </div>
  )
}
Props.displayName = 'Props'
Props.propTypes = {props: PropTypes.object}

class ReactDocGen extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      category: PropTypes.string,
      component: PropTypes.string
    })
  }

  constructor (props, ctxt) {
    super(props, ctxt)
    this.state = {parsed: false}
  }

  componentDidMount () {
    tryRequire(this.props.params).then(([src, _]) => this.setState({parsed: reactDocs.parse(src)}))
  }

  render () {
    const {parsed} = this.state
    return parsed && (
      <div className='sui-StudioReactDocGen'>
        <h1 className='sui-StudioReactDocGen-displayName'>{parsed.displayName || 'Missing displayName'}</h1>
        <p className='sui-StudioReactDocGen-description'>{parsed.description || 'Missing description'}</p>
        <div className='sui-StudioReactDocGen-methodsContainer'><Methods methods={parsed.methods} /></div>
        <div className='sui-StudioReactDocGen-propsContainer'><Props props={parsed.props} /></div>
      </div>
    )
  }
}

ReactDocGen.displayName = 'ReactDocGen'
export default ReactDocGen
