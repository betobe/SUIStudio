const app = require('express')()
const client = require('./middlewares/client')
const defaultIndex = require('simple-html-index')
const {logger, requestLogger} = require('./logger')

const PORT = process.env.PORT || 3000

app.use(requestLogger)

app.get('/', (req, res) => defaultIndex({ entry: '/bundle.js' }).pipe(res))
app.get('/bundle.js', client.middleware)

app.listen(PORT, () => logger.info(`SUIStudio up and running in localhost:${PORT}`))
