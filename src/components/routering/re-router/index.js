import React from 'react'

// const ReRoutering = (props, context) => {
class ReRoutering extends React.Component {
  render () {
    return (
      <div>
        <h1>ReRoutering</h1>
        <code><pre>{JSON.stringify({params: this.props.params, context: this.context}, null, 2)}</pre></code>
      </div>
    )
  }
}

ReRoutering.displayName = 'ReRoutering'
ReRoutering.contextTypes = {
  i18n: React.PropTypes.object,
  user: React.PropTypes.object
}

export default ReRoutering
