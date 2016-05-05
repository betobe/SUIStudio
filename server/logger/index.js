const bunyan = require('bunyan')
const bunyanRequest = require('bunyan-request')

const logger = bunyan.createLogger({name: 'SUIStudio'})
const requestLogger = bunyanRequest({
  logger: logger,
  headerName: 'x-request-id'
})

exports.logger = logger
exports.requestLogger = requestLogger
