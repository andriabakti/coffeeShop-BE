const { Router } = require('express')
const menuRoutes = require('./product_routes')
const route = Router()

route.use('/menu', menuRoutes)

module.exports = route
