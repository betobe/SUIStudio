const tryRequire = ({category, name, component}) => {
  const reqComponentsReadme = require.context(`raw!${__BASE_DIR__}/src`, true, /^.*\/README\.md?/)
  // https://webpack.github.io/docs/loaders.html#loader-order
  const reqComponentsSrc = require.context(`!!raw!${__BASE_DIR__}/src`, true, /^.*\/index\.jsx?/)

  let src
  try {
    src = reqComponentsSrc(`./${category}/${name}/${component}/index.js`)
  } catch (e) {
    src = reqComponentsSrc(`./${category}/${name}/${component}/index.jsx`)
  }

  let readme
  try {
    readme = reqComponentsReadme(`./${category}/${name}/${component}/README.md`)
  } catch (e) {
    readme = `### ${category}/${name}/${component} no tiene README`
  }

  return [src, readme]
}

export default tryRequire
