import React from 'react'

const tryRequire = (iconName) => {
  try {
    return require(`./svg/${iconName}.svg`)
  } catch (e) {
    console.warn( // eslint-disable-line
      `sui-icon: <${iconName}> icon not found.
      Did you misspell the icon's name?`
    )
    return ''
  }
}

export default class Icon extends React.Component {
  render () {
    const props = this.props
    const { color, name, size } = props
    const styles = color ? {fill: color} : null
    const svg = tryRequire(name)
    const strippedSvg = svg.replace(/<svg.*?>/, '').replace(/<\/svg>/, '')

    return (
      <svg
        style={styles}
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        {...props}
        viewBox='0 0 32 32'
        dangerouslySetInnerHTML={{__html: strippedSvg}}>
      </svg>
    )
  }
}

Icon.defaultProps = {
  size: 20
}
