import React from 'react'

const RealEstateI18N = ({literal}, {i18n, user}) => {
  return (
    <div>
      <h1>RealEstateI18N</h1>
      <p>User: {user.id} isLogger {user.isLogged() ? 'Yep' : 'Nop'}</p>
      <p>{i18n.t(literal || 'NO_LITERAL')}</p>
    </div>
  )
}

// class RealEstateI18N extends React.Component {
//   render () {
//     const {i18n, user} = this.context
//     const {literal} = this.props
//     return (
//       <div>
//         <h1>RealEstateI18N</h1>
//         <p>User: {user.id} isLogger {user.isLogged() ? 'Yep' : 'Nop'}</p>
//         <p>{i18n.t(literal || 'NO_LITERAL')}</p>
//       </div>
//     )
//   }
// }

RealEstateI18N.displayName = 'RealEstateI18N'
RealEstateI18N.contextTypes = {
  i18n: React.PropTypes.object,
  user: React.PropTypes.object
}

export default RealEstateI18N
