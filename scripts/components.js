#!/usr/bin/env node

const klaw = require('klaw')
const through2 = require('through2')
const {join, basename, sep} = require('path')
const {PWD} = process.env
const {BASE} = process.env

const BASE_DIR = join(BASE || PWD, 'components/')
const COMPONENT_FILENAME_REG_EXP = /index\.jsx?/
const COMPONENT_LIB_FOLDER_REG_EXP = /lib/
const MAX_DEPTH_COMPONENT_TREE = 4

const components = []

const filterComponents = through2.obj(function (item, enc, next) {
  if (
    basename(item.path).match(COMPONENT_FILENAME_REG_EXP) &&
    item.path.replace(BASE_DIR, '').split(sep).length === MAX_DEPTH_COMPONENT_TREE &&
    !item.path.replace(BASE_DIR, '').match(COMPONENT_LIB_FOLDER_REG_EXP)
  ) {
    this.push(item)
  }
  next()
})

const mapPathToComponent = (path) => {
  const [category, component, file] = path.replace(BASE_DIR, '').split(sep) // eslint-disable-line
  return { category, component }
}

const parser = () => {
  return new Promise((resolve, reject) => {
    if (components.length !== 0) { return resolve(components) } // Un poco de cache en memoria no hace daño

    klaw(BASE_DIR)
      .pipe(filterComponents)
      .on('data', (item) => components.push(mapPathToComponent(item.path)))
      .on('end', resolve.bind(null, components))
      .on('error', reject)
  })
}

module.exports = parser
