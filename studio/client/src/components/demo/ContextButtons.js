import React from 'react'

const ContextButtons = ({ctxt, onContextChange}) => {
  return (
    <div className='SUIStudioContextButtons'>
    {
      Object.keys(ctxt).map(
        (ctxtType, index) =>
          <button
            className='SUIStudioContextButtons-context'
            key={index}
            onClick={(evt) => onContextChange(ctxtType)}>{ctxtType}</button>
      )
    }
    </div>
  )
}

ContextButtons.displayName = 'ContextButtons'
export default ContextButtons
