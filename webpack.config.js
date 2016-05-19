const parser = require('./studio/scripts/components')
const getConfig = require('hjs-webpack')

const config = getConfig({
  in: 'studio/client/src/app.js',
  out: 'studio/client/public',
  clearBeforeBuild: true,
  html: (data, cb) => {
    parser().then((components) => {
      /*eslint-disable */
      cb(null, {
        'index.html': [
          '<html>',
            '<head>',
              '<link href="/' + data.css + '" rel="stylesheet" type="text/css" />',
            '</head>',
            '<body>',
              '<div id="root"></div>',
              '<script>var __components = ' + JSON.stringify(components) + '</script>',
              '<script src="/' + data.main + '"></script>',
            '</body>',
          '</html>'
        ].join(''),
        'components.json': JSON.stringify(components, null, 2)
      })
      /*eslint-enable */
    })
  }
})

config.module.loaders.push({ test: /\.svg$/, loader: 'svg-inline' })

module.exports = config
