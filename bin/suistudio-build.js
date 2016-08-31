// const ghpages = require('gh-pages')
const colors = require('colors')
const {execFile} = require('child_process')
const {join} = require('path')
// const {PWD, BASE} = process.env

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const devServerExec = join(__dirname, '..', 'node_modules', '.bin', 'webpack')
const child = execFile(
  devServerExec,
  [],
  {cwd: join(__dirname, '..')},
  (err, stdout, stderr) => {
    if (err) { console.log(colors.red(err.msg)) }
    console.log(colors.gray('Tal vez quieres publicar tu carpeta public a surge.sh'))
    // ghpages.publish(join(PWD, 'public'), {
    //   repo: require(join(PWD, 'package.json')).repository.url
    // }, console.log.bind(console))
  }
)
child.stdout.pipe(process.stdout)

