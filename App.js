// package: dotenv
require('dotenv').config()
// package: express
const express = require('express')
const { urlencoded, json, static } = require('express')
// package: cors
const cors = require('cors')
// package: morgan
const logger = require('morgan')

// router: base
const routes = require('./src/routers/')
// variable: port
const port = process.env.PORT || 3939
// usage: express
const app = express()

// usage: packages
app.use(
  urlencoded({
    extended: false
  }),
  json()
)
app.use(cors())
app.options('*', cors())
app.use(logger('dev'))
app.use('/api/v1', routes)
app.use('/uploads', static('./uploads'))

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
