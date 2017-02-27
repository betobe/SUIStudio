import Link from 'react-router/lib/Link'
import React from 'react'

const RoutesButtons = ({routes, category, component}) => {
  return (
    <div className='sui-StudioRoutesButtons'>
    {
      Object.keys(routes)
            .filter(key => key !== 'pattern')
            .map(
              (route, index) => {
                const to = `/workbench/${category}/${component}/demo${routes[route]}`
                return <Link className='sui-StudioRoutesButtons-link' key={index} to={to}>{route}</Link>
              }
            )
    }
    </div>
  )
}

RoutesButtons.displayName = 'RoutesButtons'
export default RoutesButtons
