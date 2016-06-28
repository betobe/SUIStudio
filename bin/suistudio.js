#!/usr/bin/env node

const program = require('commander')
const {execFile} = require('child_process')
const {join} = require('path')
const pkg = require('../package.json')

const version = pkg.version

program
  .version(version, '    --version')

program
  .command('start')
  .option('-d, --dir-base [dir]', 'Setup base dir where live src and demo folders', '.')
  .action(({dirBase}) => {
    const devServerExec = join(__dirname, '..', 'node_modules', 'hjs-webpack', 'bin', 'hjs-dev-server.js')
    const child = execFile(
      devServerExec,
      [],
      {cwd: join(__dirname, '..')},
      console.log.bind(console)
    )
    child.stdout.pipe(process.stdout)
  })

program.parse(process.argv)
