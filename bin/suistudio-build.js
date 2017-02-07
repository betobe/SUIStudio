const colors = require('colors')
const {execFile} = require('child_process')
const {join} = require('path')

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const devServerExec = join(__dirname, '..', 'node_modules', '.bin', 'webpack')
const child = execFile(
  devServerExec,
  ['--env.prod', '-p'],
  {cwd: join(__dirname, '..')},
  (err, stdout, stderr) => {
    if (err) { console.log(colors.red(err.msg)) }
    console.log(colors.gray('Tal vez quieres publicar tu carpeta public a surge.sh'))
  }
)
child.stdout.pipe(process.stdout)

