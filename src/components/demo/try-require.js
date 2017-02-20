const tryRequire = ({category, component}) => {
  const reqComponentsSrc = require.context(`bundle-loader?lazy!${__BASE_DIR__}/components`, true, /^\.\/\w+\/\w+\/src\/index\.jsx?/)
  const reqComponentsPlayGround = require.context(`bundle-loader?lazy!raw-loader!${__BASE_DIR__}/demo`, true, /^.*\/playground/)
  const reqContextPlayGround = require.context(`bundle-loader?lazy-loader!${__BASE_DIR__}/demo`, true, /^.*\/context\.js/)
  const reqRouterPlayGround = require.context(`bundle-loader?lazy-loader!${__BASE_DIR__}/demo`, true, /^.*\/routes\.js/)

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
