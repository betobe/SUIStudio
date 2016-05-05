const app = require('express')()
const log = require('debug')('suistudio:server')

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World'))

app.listen(PORT, () => log(`SUIStudio up and running in localhost:${PORT}`))
