const program = require('commander')
const colors = require('colors')
const fse = require('fs-extra')
const pascalCase = require('pascal-case')

program
  .option('-R, --router', 'add routering for this component')
  .option('-C, --context', 'add context for this component')
  .option('-P, --prefix', 'add prefix for this component')
  .option('-S, --scope', 'add scope for this component')
  .on('--help', () => {
    console.log('  Examples:')
    console.log('')
    console.log('    $ suistudio generate <category> <component>')
    console.log('    $ suistudio generate cards alfa')
    console.log('    $ suistudio generate searchs re-beta -P mt')
    console.log('    $ suistudio generate searchs re-beta -R -C')
    console.log('    $ custom-help --help')
    console.log('    $ custom-help -h')
    console.log('')
  })
  .parse(process.argv)

const BASE_DIR = process.cwd()
const [category, component] = program.args
const componentInPascal = pascalCase(`${category.replace(/s$/, '')} ${component}`)
const {router, context, prefix = 'sui'} = program
let {scope} = program
scope = scope === undefined ? '' : `@${scope}/`

const showError = (msg) => {
  program.outputHelp(txt => colors.red(txt))
  console.error(colors.red(msg))
  process.exit(1)
}

if (!component) { showError('component must be defined') }

const COMPONENT_ENTRY_JS_POINT_FILE = `${BASE_DIR}/components/${category}/${component}/src/index.js`
const COMPONENT_PACKAGE_JSON_FILE = `${BASE_DIR}/components/${category}/${component}/package.json`
const COMPONENT_PACKAGE_GITIGNORE_FILE = `${BASE_DIR}/components/${category}/${component}/.gitignore`
const COMPONENT_PACKAGE_NPMIGNORE_FILE = `${BASE_DIR}/components/${category}/${component}/.npmignore`
const COMPONENT_ENTRY_SCSS_POINT_FILE = `${BASE_DIR}/components/${category}/${component}/src/index.scss`
const COMPONENT_README_FILE = `${BASE_DIR}/components/${category}/${component}/README.md`

const COMPONENT_PLAYGROUND_FILE = `${BASE_DIR}/demo/${category}/${component}/playground`
const COMPONENT_CONTEXT_FILE = `${BASE_DIR}/demo/${category}/${component}/context.js`
const COMPONENT_ROUTES_FILE = `${BASE_DIR}/demo/${category}/${component}/routes.js`

const COMPONENTS_LIST = `${BASE_DIR}/.COMPONENTS`

fse.appendFileSync(COMPONENTS_LIST, `${category}/${component}\n`)

const writeFile = (path, body) => {
  fse.outputFile(
    path,
    body,
    err => {
      if (err) { showError(`Fail creating ${path}`) }
      console.log(colors.gray(`Created ${path}`))
    }
  )
}

writeFile(
COMPONENT_PACKAGE_GITIGNORE_FILE,
`
lib
node_modules
`
)

writeFile(
COMPONENT_PACKAGE_NPMIGNORE_FILE,
`
src
`
)

writeFile(
COMPONENT_PACKAGE_JSON_FILE,
`
{
  "name": "${scope}${prefix}-${component}",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "scripts": {
    "build": "rm -Rf ./lib && mkdir -p ./lib && npm run babel && npm run sass",
    "babel": "../../../node_modules/.bin/babel ./src --out-dir ./lib",
    "sass": "../../../node_modules/.bin/cpx \\"./src/**/*.scss\\" ./lib",
    "preversion": "echo \\"preversion\\"",
    "version": "npm run build",
    "postversion": "git add \${PWD} && git commit -m \\"release(${category}/${component}): v$(node -p -e \\"require('./package.json').version\\")\\" && git push origin master && npm publish --access=public"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@schibstedspain/suistudio-fatigue-deps": "github:SUI-Components/suistudio-fatigue-deps"
  },
  "babel": {
    "presets": [
      "es2015",
      "react",
      "stage-3"
    ],
    "plugins": [
      "transform-runtime"
    ]
  }
}
`
)

writeFile(
COMPONENT_ENTRY_JS_POINT_FILE,
`
import React, {Component} from 'react'

class ${componentInPascal} extends Component {
  render () {
    return (
      <div className='${prefix}-${componentInPascal}'>
        <h1>${componentInPascal}</h1>
      </div>
    )
  }
}

${componentInPascal}.displayName = '${componentInPascal}'

// Remove these comments if you need
// ${componentInPascal}.contextTypes = {i18n: React.PropTypes.object}
// ${componentInPascal}.propTypes = {}
// ${componentInPascal}.defaultProps = {}

export default ${componentInPascal}
`
)

writeFile(
COMPONENT_ENTRY_SCSS_POINT_FILE,
`
@import '~@schibstedspain/theme-basic/lib/index';

.${prefix}-${componentInPascal} {
  // Do your magic
}
`
)

writeFile(
COMPONENT_README_FILE,
`
### ${componentInPascal}
Dont forget write a README
`
)

writeFile(
  COMPONENT_PLAYGROUND_FILE,
  `return (<${componentInPascal} />)`
)

router && writeFile(
COMPONENT_ROUTES_FILE,
`
module.exports = {
  pattern: '/:lang',
  'default': '/es',
  'en': '/en',
  'de': '/de'
}
`
)

context && writeFile(
COMPONENT_CONTEXT_FILE,
`
module.exports = {
  'default': {
    i18n: {t (s) { return s.split('').reverse().join('') }}
  }
}
`
)
