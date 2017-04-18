/* eslint no-console:0 */

const colors = require('colors')
const {remove} = require('fs-extra')
const BASE_DIR = process.cwd()
const COMPONENTS_LIST = `${BASE_DIR}/.COMPONENTS`
const cwds = require('./shared').cwds(BASE_DIR, COMPONENTS_LIST)

const removeNodeModulesFolder = (cwd) => {
  const [component, category] = cwd.split('/').reverse()
  const prefix = `${category}/${component}`
  return new Promise((resolve, reject) => {
    console.log(colors.gray(`[${prefix}]: Removing node_modules`))
    remove(`${cwd}/node_modules`, err => {
      if (err) { return reject(err) }
      console.log(colors.gray(`[${prefix}]: Removed`))
      resolve()
    })
  })
}

Promise.all(cwds.map(removeNodeModulesFolder))
