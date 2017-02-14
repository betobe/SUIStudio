import Link from 'react-router/lib/Link'
import React from 'react'
import cx from 'classnames'

const ThemesButtons = ({themes, category, component, selected}) => {
  if (themes.length === 0) { return null }
  const className = cx('SUIStudioThemesButtons-theme', {
    'is-current': selected === 'default'
  })
  return (
    <div className='SUIStudioThemesButtons'>
      <p className='SUIStudioThemesButtons-title'>Themes:</p>
      <a className='SUIStudioThemesButtons-link' href={`/workbench/${category}/${component}/demo`}>
        <button className={className}>Default</button>
      </a>
    {
      themes.map(
        (theme, index) => {
          const to = `/workbench/${category}/${component}/demo?theme=${theme}`
          const className = cx('SUIStudioThemesButtons-theme', {
            'is-current': selected === theme
          })
          return (
            <a className='SUIStudioThemesButtons-link' key={index} href={to}>
              <button className={className}>{theme}</button>
            </a>
          )
        }
      )
    }
    </div>
  )
}

ThemesButtons.displayName = 'ThemesButtons'
export default ThemesButtons

