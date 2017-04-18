const readFileSync = require('fs').readFileSync

const cwds = (baseDir, componentsList) => {
  return readFileSync(componentsList, 'utf8')
    .trim()
    .split('\n')
    .map(pkg => `${baseDir}/components/${pkg}`)
}

module.exports = {
  cwds: cwds
}