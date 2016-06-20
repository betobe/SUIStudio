const tryRequire = ({category, name, component}) => {
  const reqComponentsSrc = require.context('./../../../../../src', true, /^.*\/index\.jsx?/)
  const reqComponentsSCSS = require.context('./../../../../../src', true, /^.*\/index\.scss/)
  const reqComponentsPlayGround = require.context('raw!./../../../../../demo', true, /^.*\/playground/)
  const reqContextPlayGround = require.context('./../../../../../demo', true, /^.*\/context\.js/)
  const noComponent = () => <h1>No Component for {`${category}/${name}/${component}`}</h1>

  let Component
  try {
    Component = reqComponentsSrc(`./${category}/${name}/${component}/index.js`).default
  } catch (e) {
    Component = reqComponentsSrc(`./${category}/${name}/${component}/index.jsx`).default
  }

  try {
    reqComponentsSCSS(`./${category}/${name}/${component}/index.scss`)
  } catch (e) { console.warn(`No styles for ${category}/${name}/${component}`) }

  let playground
  try {
    playground = reqComponentsPlayGround(`./${category}/${name}/${component}/playground`)
  } catch (e) {
    playground = `return <${Component.displayName || Component.name} />`
  }

  let context
  try {
    context = reqContextPlayGround(`./${category}/${name}/${component}/context.js`)
  } catch (e) { context = false }

  return [Component || noComponent, playground, context]
}

export default tryRequire
