const parser = require('./scripts/components')
const getConfig = require('@schibstedspain/suistudio-webpack')
const {join} = require('path')
const {PWD, BASE} = process.env
const PUBLIC_DIR = join(BASE || PWD, 'public')

const { suistudio = {} } = require(`${PWD}/package.json`).config

module.exports = (...args) => {
  return parser().then(components => {
    const config = getConfig({
      entry: {
        app: './app.js',
        vendor: ['react', 'react-dom']
      },
      output: {
        path: PUBLIC_DIR
      },
      plugins: {
        DefinePlugin: {
          __BASE_DIR__: JSON.stringify(BASE || PWD)
        },
        HtmlWebpackPlugin: {
          components: components,
          suistudio: suistudio
        }
      }
    }).apply(this, args)

    // Custom changes only for SUIStudio
    Object.assign(config.module.loaders[0], {
      exclude: /node_modules(?!\/@schibstedspain\/sui-studio\/src)/ // make it work globally
    })
    Object.assign(config.resolve, {alias: {'react': `${__dirname}/node_modules/react`}})

    return config
  })
}
