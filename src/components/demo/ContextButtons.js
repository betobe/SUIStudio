import React from 'react'
import cx from 'classnames'

const isEmptyObject = obj => {
  for (var x in obj) { if (obj.hasOwnProperty(x)) { return false } }
  return true
}

const ContextButtons = ({ctxt, onContextChange, selected}) => {
  if (isEmptyObject(ctxt)) { return null }
  return (
    <div className='SUIStudioContextButtons'>
      <p className='SUIStudioContextButtons-title'>Contexts:</p>
      {
        Object.keys(ctxt).map(
          (ctxtType, index) => {
            const className = cx('SUIStudioContextButtons-context', {
              'is-current': selected === index
            })
            return (
              <button
                className={className}
                key={index}
                onClick={(evt) => onContextChange(ctxtType, index)}>{ctxtType}</button>
            )
          })
      }
    </div>
  )
}

ContextButtons.displayName = 'ContextButtons'

ContextButtons.defaultProps = {
  selected: 0
}
export default ContextButtons
