// Import Express
const express = require('express')
const { urlencoded, json } = require('express')
// const pkgs
require('dotenv').config()
const logger = require('morgan')
const cors = require('cors')
// const Route
const routes = require('./src/routers/')
// Init Express
const app = express()
// Use pkgs
app.use(
	urlencoded({
		extended: false
	}),
	json()
)

app.use(logger('dev'))
app.use(cors())
// Basic Route
app.use('/api/v1', routes)

// Run Server
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}`)
})
