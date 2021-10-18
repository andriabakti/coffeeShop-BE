require('dotenv').config()
const express = require('express')
const { urlencoded, json } = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const routesNav = require('./src/routers/')

const app = express()
const port = process.env.PORT || 3939

app.use(
	urlencoded({
		extended: false
	}),
	json()
)
app.use(helmet())
app.use(cors())
app.options('*', cors())
app.use(logger('dev'))
app.use('/api/v1', routesNav)

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`)
})
