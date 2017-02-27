import React from 'react'
import cx from 'classnames'

const isEmptyObject = obj => {
  for (var x in obj) { if (obj.hasOwnProperty(x)) { return false } }
  return true
}

const ContextButtons = ({ctxt, onContextChange, selected}) => {
  if (isEmptyObject(ctxt)) { return null }
  return (
    <div className='sui-StudioContextButtons'>

      <ul className='sui-StudioContextButtons-buttons sui-StudioTabs sui-StudioTabs--horizontal'>
        <li className='sui-StudioTabs-title'>
          <span className='sui-StudioTabs-titleLink'>Context</span>
        </li>
        {
          Object.keys(ctxt).map(
            (ctxtType, index) => {
              const className = cx('sui-StudioTabs-link', {
                'sui-StudioTabs-link--active': selected === index
              })
              return (
                <li className='sui-StudioTabs-tab'>
                  <button
                    className={className}
                    key={index}
                    onClick={(evt) => onContextChange(ctxtType, index)}>{ctxtType}</button>
                </li>
              )
            })
        }
      </ul>
    </div>
  )
}

ContextButtons.displayName = 'ContextButtons'

ContextButtons.defaultProps = {
  selected: 0
}
export default ContextButtons
