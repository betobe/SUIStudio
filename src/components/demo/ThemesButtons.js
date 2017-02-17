import React from 'react'
import cx from 'classnames'

const ThemesButtons = ({themes, onThemeChange, selected}) => {
  if (themes.length === 0) { return null }
  const className = cx('SUIStudioThemesButtons-theme', {
    'is-current': selected === -1
  })
  return (
    <div className='SUIStudioThemesButtons'>
      <p className='SUIStudioThemesButtons-title'>Themes:</p>
      <button className={className} onClick={(evt) => onThemeChange('default', -1)}>default</button>
      {
        themes.map(
          (theme, index) => {
            const className = cx('SUIStudioThemesButtons-theme', {
              'is-current': selected === index
            })
            return (
              <button
                className={className}
                key={index}
                onClick={(evt) => onThemeChange(theme, index)}>{theme}</button>
            )
          }
        )
      }
    </div>
  )
}

ThemesButtons.displayName = 'ThemesButtons'
export default ThemesButtons

