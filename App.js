require('dotenv').config()
const express = require('express')
const { urlencoded, json, static } = require('express')
const cors = require('cors')
const logger = require('morgan')
const routes = require('./src/routers/')

const app = express()
const port = process.env.PORT || 3939

app.use(
	urlencoded({
		extended: false
	}),
	json()
)
app.use(cors({
	origin: 'https://andria-coffeeteria.netlify.app',
	credentials: true
}))
app.use(logger('dev'))
app.use('/api/v1', routes)
app.use('/uploads', static('./uploads'))

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`)
})
