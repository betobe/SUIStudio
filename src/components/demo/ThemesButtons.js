import React from 'react'
import cx from 'classnames'

const ThemesButtons = ({themes, onThemeChange, selected}) => {
  if (themes.length === 0) { return null }
  const className = cx('sui-StudioTabs-link', {
    'sui-StudioTabs-link--active': selected === -1
  })
  return (
    <div className='sui-StudioThemesButtons'>
      <ul className='sui-StudioContextButtons-buttons sui-StudioTabs sui-StudioTabs--horizontal'>
        <li className='sui-StudioTabs-title'>
          <span className='sui-StudioTabs-titleLink'>Theme</span>
        </li>
        <li className='sui-StudioTabs-tab'>
          <button className={className} onClick={(evt) => onThemeChange('default', -1)}>default</button>
        </li>
        {
          themes.map(
            (theme, index) => {
              const className = cx('sui-StudioTabs-link', {
                'sui-StudioTabs-link--active': selected === index
              })
              return (
                <li className='sui-StudioTabs-tab'>
                  <button
                    className={className}
                    key={index}
                    onClick={(evt) => onThemeChange(theme, index)}>{theme}</button>
                </li>
              )
            }
          )
        }
      </ul>
    </div>
  )
}

ThemesButtons.displayName = 'ThemesButtons'
export default ThemesButtons
