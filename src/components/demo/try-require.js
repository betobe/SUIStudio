const tryRequire = ({category, name, component}) => {
  const reqComponentsSrc = require.context(`bundle?lazy!${__BASE_DIR__}/src`, true, /^.*\/index\.jsx?/)
  const reqComponentsSCSS = require.context(`bundle?lazy!${__BASE_DIR__}/src`, true, /^.*\/index\.scss/)
  const reqComponentsPlayGround = require.context(`bundle?lazy!raw!${__BASE_DIR__}/demo`, true, /^.*\/playground/)
  const reqContextPlayGround = require.context(`bundle?lazy!${__BASE_DIR__}/demo`, true, /^.*\/context\.js/)
  const reqRouterPlayGround = require.context(`bundle?lazy!${__BASE_DIR__}/demo`, true, /^.*\/routes\.js/)

  const Component = new Promise(resolve => {
    require.ensure([], () => {
      let bundler
      try {
        bundler = reqComponentsSrc(`./${category}/${name}/${component}/index.js`)
      } catch (e) {
        bundler = reqComponentsSrc(`./${category}/${name}/${component}/index.jsx`)
      }
      bundler(bundle => resolve(bundle.default))
    })
  })

  require.ensure([], () => {
    try {
      const bundler = reqComponentsSCSS(`./${category}/${name}/${component}/index.scss`)
      bundler(src => console.info(`ADD styles ./${category}/${name}/${component}/index.scss`))
    } catch (e) { console.warn(`No styles for ${category}/${name}/${component}`) }
  })

  const playground = new Promise(resolve => {
    require.ensure([], () => {
      try {
        const bundler = reqComponentsPlayGround(`./${category}/${name}/${component}/playground`)
        bundler(playground => resolve(playground))
      } catch (e) {
        return resolve(`return (<${Component.displayName || Component.name} />)`)
      }
    })
  })

  const context = new Promise(resolve => {
    require.ensure([], () => {
      try {
        const bundler = reqContextPlayGround(`./${category}/${name}/${component}/context.js`)
        bundler(context => resolve(context))
      } catch (e) {
        return resolve(false)
      }
    })
  })

  const routes = new Promise(resolve => {
    require.ensure([], () => {
      try {
        const bundler = reqRouterPlayGround(`./${category}/${name}/${component}/routes.js`)
        bundler(routes => resolve(routes))
      } catch (e) {
        return resolve(false)
      }
    })
  })

  return Promise.all([Component, playground, context, routes])
}

export default tryRequire
