import React from 'react'

const RealEstateI18N = (props, {i18n, user}) => {
  const {literal} = props
  return (
    <div>
      <h1>RealEstateI18N</h1>
      <p>User: {user.id} isLogger {user.isLogged() ? 'Yep' : 'Nop'}</p>
      <p>{i18n.t(literal || 'NO_LITERAL')}</p>
      <pre><code>{JSON.stringify(props, null, 2)}</code></pre>
    </div>
  )
}

RealEstateI18N.displayName = 'RealEstateI18N'
RealEstateI18N.contextTypes = {
  i18n: React.PropTypes.object,
  user: React.PropTypes.object
}

export default RealEstateI18N
