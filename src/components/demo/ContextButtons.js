import React from 'react'
import cx from 'classnames'

const ContextButtons = ({ctxt, onContextChange, selected}) => {
  return (
    <div className='SUIStudioContextButtons'>
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
