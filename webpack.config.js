const parser = require('./studio/scripts/components')
const getConfig = require('hjs-webpack')

const paths = ({css, main, isDev}) => {
  return !isDev
    ? {css, main}
    : {css: `/${css}`, main: `/${main}`}
}

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

module.exports = config
