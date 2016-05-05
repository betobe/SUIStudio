const app = require('express')()
const {logger, requestLogger} = require('./logger')

const PORT = process.env.PORT || 3000

app.use(requestLogger)

app.get('/', (req, res) => res.send('Hello World'))

app.listen(PORT, () => logger.info(`SUIStudio up and running in localhost:${PORT}`))
