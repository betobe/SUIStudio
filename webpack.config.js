const webpack = require('webpack')
const parser = require('./scripts/components')
const getConfig = require('hjs-webpack')

const {join} = require('path')
const {PWD, BASE} = process.env

const PUBLIC_DIR = join(BASE || PWD, 'public')

const suistudio = (require(`${PWD}/package.json`).config || {}).suistudio

const template = (data, components) => `
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"/>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.21.0/theme/material.min.css"/>
    <link href="${suistudio.font}" rel="stylesheet" />
    <link href="/${data.css}" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script>var __components = ${JSON.stringify(components)}</script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js"></script>
    <script src="/${data.shared}"></script>
    <script src="/${data.main}"></script>
  </body>
</html>
`

const config = getConfig({
  in: 'src/app.js',
  out: PUBLIC_DIR,
  output: {
    filename: '[name].[hash].js',
    cssFilename: '[name].[contenthash].css',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  clearBeforeBuild: true,
  html: (data, cb) => {
    parser().then((components) => {
      cb(null, {
        'index.html': template(data, components),
        '200.html': template(data, components)
      })
    })
  }
})

config.plugins.push(new webpack.optimize.CommonsChunkPlugin('shared', '[name].bundle.js'))
config.plugins.push(
  new webpack.DefinePlugin({
    __BASE_DIR__: JSON.stringify(process.env.BASE || process.env.PWD)
  })
)

config.module.loaders[0] = Object.assign({}, config.module.loaders[0], {query: require('./package').babel})

module.exports = config
