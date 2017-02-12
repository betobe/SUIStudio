const tryRequire = ({category, component}) => {
  const reqComponentsSrc = require.context(`bundle?lazy!${__BASE_DIR__}/components`, true, /^\.\/\w+\/\w+\/src\/index\.jsx?/)
  const reqComponentsSCSS = require.context(`bundle?lazy!${__BASE_DIR__}/components`, true, /^\.\/\w+\/\w+\/src\/index\.scss/)
  const reqComponentsPlayGround = require.context(`bundle?lazy!raw!${__BASE_DIR__}/demo`, true, /^.*\/playground/)
  const reqContextPlayGround = require.context(`bundle?lazy!${__BASE_DIR__}/demo`, true, /^.*\/context\.js/)
  const reqRouterPlayGround = require.context(`bundle?lazy!${__BASE_DIR__}/demo`, true, /^.*\/routes\.js/)

  // const reqThemePlayGround = require.context(`bundle?lazy!${__BASE_DIR__}/demo`, true, /^.*\/themes\/.*\.scss/)

  const Component = new Promise(resolve => {
    require.ensure([], () => {
      let bundler
      try {
        bundler = reqComponentsSrc(`./${category}/${component}/src/index.js`)
      } catch (e) {
        bundler = reqComponentsSrc(`./${category}/${component}/src/index.jsx`)
      }
      bundler(bundle => resolve(bundle.default))
    })
  })

  require.ensure([], () => {
    try {
      const bundler = reqComponentsSCSS(`./${category}/${component}/src/index.scss`)
      // const bundler = reqThemePlayGround(`./${category}/${component}/themes/coches.scss`)
      bundler(src => console.info(`ADD styles ./${category}/${component}/src/index.scss`))
    } catch (e) { console.warn(`No styles for ${category}/${component}`) }
  })

  const playground = new Promise(resolve => {
    require.ensure([], () => {
      try {
        const bundler = reqComponentsPlayGround(`./${category}/${component}/playground`)
        bundler(playground => resolve(playground))
      } catch (e) {
        return resolve(`return (<${Component.displayName || Component.name} />)`)
      }
    })
  })

  const context = new Promise(resolve => {
    require.ensure([], () => {
      try {
        const bundler = reqContextPlayGround(`./${category}/${component}/context.js`)
        bundler(context => resolve(context))
      } catch (e) {
        return resolve(false)
      }
    })
  })

  const routes = new Promise(resolve => {
    require.ensure([], () => {
      try {
        const bundler = reqRouterPlayGround(`./${category}/${component}/routes.js`)
        bundler(routes => resolve(routes))
      } catch (e) {
        return resolve(false)
      }
    })
  })

  return Promise.all([Component, playground, context, routes])
}

export default tryRequire
