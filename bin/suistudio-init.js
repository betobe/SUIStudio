/* eslint no-console:0 */

const colors = require('colors')
const program = require('commander')
const BASE_DIR = process.cwd()
const fse = require('fs-extra')

program
  .parse(process.argv)

const [PROJECT_NAME] = program.args

const showError = (msg) => {
  program.outputHelp(txt => colors.red(txt))
  console.error(colors.red(msg))
  process.exit(1)
}

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

const createDir = (path) => {
  fse.mkdirp(path, err => {
    if (err) { showError(`Fail creating ${path}`) }
    console.log(colors.gray(`Created ${path}`))
  })
}

createDir(`${BASE_DIR}/${PROJECT_NAME}/components`)
createDir(`${BASE_DIR}/${PROJECT_NAME}/demo`)

writeFile(
`${BASE_DIR}/${PROJECT_NAME}/.COMPONENTS`,
''
)

writeFile(
`${BASE_DIR}/${PROJECT_NAME}/components/README.md`,
'# Here put a description about your project'
)

writeFile(
`${BASE_DIR}/${PROJECT_NAME}/package.json`,
`# ${PROJECT_NAME}`
)

writeFile(
`${BASE_DIR}/${PROJECT_NAME}/package.json`,
`
{
  "name": "${PROJECT_NAME}",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "phoenix": "rm -Rf node_modules && npm it",
    "deploy": "suistudio build && surge public/ -d ${PROJECT_NAME}.surge.sh",
    "co": "git-cz",
    "lint:js": "node_modules/.bin/eslint --ext .js,.jsx src/",
    "lint:sass": "node_modules/.bin/sass-lint src/**/*.scss -c -v",
    "lint": "npm run lint:js && npm run lint:sass"
  },
  "repository": {
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@schibstedspain/suistudio-fatigue-dev": "github:SUI-Components/suistudio-fatigue-dev"
  },
  "peerDependencies": {
    "react": "15",
    "react-dom": "15"
  },
  "dependencies": {},
  "config": {
    "ghooks": {
      "pre-commit": "echo \\"Precommits...\\"",
      "commit-msg": "validate-commit-msg"
    },
    "validate-commit-msg": {
      "types": [
        "feat",
        "fix",
        "refactor",
        "test",
        "docs",
        "release",
        "chore",
        "perf"
      ]
    },
    "commitizen": {
      "path": "node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": "./.cz-config.js"
    }
  },
  "pre-commit": [
    "lint",
    "test"
  ]
}
`
)

writeFile(
`${BASE_DIR}/${PROJECT_NAME}/.cz-config.js`,
`
const readFileSync = require('fs').readFileSync

var packageScopes = readFileSync('./.COMPONENTS', 'utf8')
                      .trim()
                      .split('\\n')
                      .sort()

var otherScopes = [
  'META',
  'examples'
]

module.exports = {
  types: [
    {value: 'feat', name: 'feat: Add a new feature'},
    {value: 'fix', name: 'fix: Submit a bug fix'},
    {value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature. Includes code style changes.'},
    {value: 'test', name: 'test: Add tests only'},
    {value: 'docs', name: 'docs: Documentation only changes'},
    {value: 'release', name: 'release: Publish a new version of a package.'},
    {value: 'chore', name: 'chore: Changes to the build process or auxiliary tools and libraries such as documentation generation. META only.'},
    {value: 'perf', name: 'perf: A code change that improves performance'}
  ],

  scopes: packageScopes.concat(otherScopes)
    .sort()
    .map(name => ({name})),

  scopeOverrides: {
    chore: [
      {name: 'META'}
    ],
    feat: packageScopes,
    fix: packageScopes,
    release: packageScopes,
    test: packageScopes
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix']
}
`
)
