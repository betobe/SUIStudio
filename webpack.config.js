var getConfig = require('hjs-webpack')

module.exports = getConfig({
  in: 'studio/client/src/js/app.js',
  out: 'studio/client/public',
  clearBeforeBuild: true
})
