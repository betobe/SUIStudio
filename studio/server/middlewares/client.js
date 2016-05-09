const browserify = require('browserify')
const {join} = require('path')
const watchifyMiddleware = require('watchify-middleware')

console.log(__dirname)

const watcher = watchifyMiddleware.emitter(browserify('index.js', {
  cache: {},
  packageCache: {},
  debug: true,
  basedir: join(__dirname, '..', '..', 'client', 'src', 'js') // TODO: REMOVE THIS!!!!
}), {errorHandler: true})

exports.watcher = watcher
exports.middleware = watcher.middleware
