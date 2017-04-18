const readdirSync = require('fs').readdirSync
const statSync = require('fs').statSync
const path = require('path')

const onlyFolders = (rootPath, fileName) => {
  return statSync(path.join(rootPath, fileName)).isDirectory()
}

module.exports = {
  cwds: (baseDir) => {
    const rootDir = path.join(baseDir, 'components')

    return readdirSync(rootDir)
      .filter(file => onlyFolders(rootDir, file))
      .map(folder => readdirSync(path.join(rootDir, folder))
        .filter(file => onlyFolders(path.join(rootDir, folder), file))
        .map(file => path.join(rootDir, folder, file))
      ).reduce((x, y) => x.concat(y)) // flatten
  }
}