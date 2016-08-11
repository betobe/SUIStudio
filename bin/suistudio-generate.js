const program = require('commander')
const colors = require('colors')
const fse = require('fs-extra')
const pascalCase = require('pascal-case')

program
  .option('-R, --router', 'add routering for this component')
  .option('-C, --context', 'add context for this component')
  .on('--help', () => {
    console.log('  Examples:')
    console.log('')
    console.log('    $ suistudio generate <category> <name> <component>')
    console.log('    $ suistudio generate components cards alfa')
    console.log('    $ suistudio generate components searchs re-beta -R -C')
    console.log('    \t category must one of "components", "pages" or "app"')
    console.log('    $ custom-help --help')
    console.log('    $ custom-help -h')
    console.log('')
  })
  .parse(process.argv)

const BASE_DIR = process.cwd()
const VALIDS_CATEGORIES = ['components', 'pages', 'app']
const [category, name, component] = program.args
const componentInPascal = pascalCase(component)
const {router, context} = program

const showError = (msg) => {
  program.outputHelp(txt => colors.red(txt))
  console.error(colors.red(msg))
  process.exit(1)
}

if (VALIDS_CATEGORIES.indexOf(category) === -1) { showError('category must be one of ["components", "pages", "app"]') }
if (!name) { showError('name must be defined') }
if (!component) { showError('component must be defined') }

const COMPONENT_ENTRY_POINT_FILE = `${BASE_DIR}/src/${category}/${name}/${component}/index.js`
const COMPONENT_README_FILE = `${BASE_DIR}/src/${category}/${name}/${component}/README.md`

const COMPONENT_PLAYGROUND_FILE = `${BASE_DIR}/demo/${category}/${name}/${component}/playground`
const COMPONENT_CONTEXT_FILE = `${BASE_DIR}/demo/${category}/${name}/${component}/context.js`
const COMPONENT_ROUTES_FILE = `${BASE_DIR}/demo/${category}/${name}/${component}/routes.js`

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
COMPONENT_ENTRY_POINT_FILE,
`
import React from 'react'

const ${componentInPascal} = (props, context) => {
  return <h1>${componentInPascal}</h1>
}

${componentInPascal}.displayName = '${componentInPascal}'

// Remove this comment if you have context
// ${componentInPascal}.contextTypes = {i18n: React.PropTypes.object}

export default ${componentInPascal}
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
