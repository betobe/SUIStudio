import React from 'react'

import tryRequire from './try-require'

var reactDocs = require('react-docgen')

const Methods = ({methods}) => {
  const Params = ({params}) => {
    return (
      <div className='SUIStudioMethods-param'>
      {
        params.map(
          (param, index) => {
            const type = param.type ? `[${param.type ? param.type.name : ''}]` : ''
            return <p key={index} className='SUIStudioMethods-paramName'>{`${param.name} ${type}: ${param.description}`}</p>
          }
        )
      }
      </div>
    )
  }

  return (
    <div className='SUIStudioMethods'>
      <h2 className='SUIStudioMethods-title'>Methods</h2>
      {
        methods.map((method, index) => (
          <div key={index} className='SUIStudioMethods-method'>
            <p className='SUIStudioMethods-methodName'>{`${method.name}: ${method.description || 'Missing description'}`}</p>
            <p className='SUIStudioMethods-methodParams'>Params</p>
            <Params params={method.params} />
            {
              method.description
                ? <p className='SUIStudioMethods-methodReturns'>{`Return: ${method.description}`}</p>
                : null
            }
          </div>
        ))
      }
    </div>
  )
}
Methods.displayName = 'Methods'

const Props = ({props = {}}) => {
  return (
    <div className='SUIStudioProps'>
      <h2 className='SUIStudioProps-title'>Props</h2>
      {
        Object.keys(props).map(
          (key, index) => {
            const required = props[key].required ? 'Required' : 'Optional'
            const description = props[key].description || 'Missing prop description'
            const type = props[key].type ? props[key].type.name : 'Missing prop type'
            const defaultValue = props[key].defaultValue ? `(${props[key].defaultValue.value})` : ''
            return <p key={index} className='SUIStudioProps-property'>{`${key} [${type}] ${required} ${defaultValue}: ${description}`}</p>
          }
        )
      }
    </div>
  )
}
Props.displayName = 'Props'

const ReactDocGen = ({params}) => {
  const [src, _] = tryRequire(params) // eslint-disable-line
  const parsed = reactDocs.parse(src)
  return (
    <div className='SUIStudioReactDocGen'>
      <h1 className='SUIStudioReactDocGen-displayName'>{parsed.displayName || 'Missing displayName'}</h1>
      <p className='SUIStudioReactDocGen-description'>{parsed.description || 'Missing description'}</p>
      <div className='SUIStudioReactDocGen-methodsContainer'><Methods methods={parsed.methods} /></div>
      <div className='SUIStudioReactDocGen-propsContainer'><Props props={parsed.props} /></div>
    </div>
  )
}

ReactDocGen.displayName = 'ReactDocGen'
export default ReactDocGen
