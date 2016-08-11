const tryRequire = ({category, name, component}) => {
  const reqComponentsReadme = require.context(`bundle?lazy!raw!${__BASE_DIR__}/src`, true, /^.*\/README\.md?/)
  // https://webpack.github.io/docs/loaders.html#loader-order
  const reqComponentsSrc = require.context(`!!bundle?lazy!raw!${__BASE_DIR__}/src`, true, /^.*\/index\.jsx?/)

  const src = new Promise(resolve => {
    require.ensure([], () => {
      let bundler
       try {
         bundler = reqComponentsSrc(`./${category}/${name}/${component}/index.js`)
       } catch (e) {
         bundler = reqComponentsSrc(`./${category}/${name}/${component}/index.jsx`)
       }
      bundler(src => resolve(src))
    })
  })

  const readme = new Promise(resolve => {
    require.ensure([], () => {
        try {
          const bundler = reqComponentsReadme(`./${category}/${name}/${component}/README.md`)
          bundler(src => resolve(src))
        } catch (e) {
          return resolve(`### ${category}/${name}/${component} no tiene README`)
        }
    })
  })

  return Promise.all([src, readme])
}

export default tryRequire
