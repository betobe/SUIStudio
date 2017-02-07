const webpack = require('webpack')
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
      exclude: /node_modules(?!\/@schibstedspain\/sui-studio\/src)/, // make it work globally
    })
    Object.assign(config.resolve, {alias: {'react': `${__dirname}/node_modules/react`}})

    return config
  })
}

// const template = (data, components) => `
// <html>
//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
//     <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css">
//     <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/theme/material.min.css">
//     <link rel="stylesheet" href="${suistudio.font}">
//     <link rel="stylesheet" href="/${data.css}">
//   </head>
//   <body>
//     <div id="root"></div>
//     <script>var __components = ${JSON.stringify(components)}</script>
//     <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js"></script>
//     <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js"></script>
//     <script src="/${data.shared}"></script>
//     <script src="/${data.main}"></script>
//   </body>
// </html>
// `
//
// const config = getConfig({
//   in: 'src/app.js',
//   out: PUBLIC_DIR,
//   output: {
//     filename: '[name].[hash].js',
//     cssFilename: '[name].[contenthash].css',
//     chunkFilename: '[name].[chunkhash].chunk.js'
//   },
//   clearBeforeBuild: true,
//   html: (data, cb) => {
//     parser().then((components) => {
//       cb(null, {
//         'index.html': template(data, components),
//         '200.html': template(data, components)
//       })
//     })
//   }
// })
//
// config.plugins.push(new webpack.optimize.CommonsChunkPlugin('shared', '[name].bundle.js'))
// config.plugins.push(
//   new webpack.DefinePlugin({
//     'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
//     __BASE_DIR__: JSON.stringify(process.env.BASE || process.env.PWD)
//   })
// )
//
// Object.assign(config.module.loaders[0], {
//   exclude: /node_modules(?!\/@schibstedspain\/sui-studio\/src)/, // make it work globally
//   query: require('./package').babel
// })
//
// // We've more than one React version
// Object.assign(config.resolve, {alias: {'react': `${__dirname}/node_modules/react`}})

