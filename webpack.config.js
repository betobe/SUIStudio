const webpack = require('webpack')
const parser = require('./scripts/components')
const getConfig = require('hjs-webpack')

const paths = ({css, main, isDev}) => {
  return !isDev
    ? {css, main}
    : {css: `/${css}`, main: `/${main}`}
}

const config = getConfig({
  in: 'src/app.js',
  out: 'client/public',
  clearBeforeBuild: true,
  html: (data, cb) => {
    parser().then((components) => {
      /*eslint-disable */
      cb(null, {
        'index.html': [
          '<html>',
            '<head>',
              '<meta charset="utf-8" />',
              '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"/>',
              '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/monokai.min.css"/>',
              '<link href="' + paths(data).css + '" rel="stylesheet" type="text/css" />',
            '</head>',
            '<body>',
              '<div id="root"></div>',
              '<script>var __components = ' + JSON.stringify(components) + '</script>',
              '<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js"></script>',
              '<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js"></script>',
              '<script src="' + paths(data).main + '"></script>',
            '</body>',
          '</html>'
        ].join('')
      })
      /*eslint-enable */
    })
  }
})

config.plugins.push(
  new webpack.DefinePlugin({
    __BASE_DIR__: JSON.stringify(process.env.BASE || process.env.PWD)
  })
)

config.module.loaders[0] = Object.assign({}, config.module.loaders[0], {query: require('./package').babel})

console.log(JSON.stringify(config, null, 2))

module.exports = config
