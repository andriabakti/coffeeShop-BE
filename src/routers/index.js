const { Router } = require('express')
const menuRoutes = require('./menu_routes')
const route = Router()

module.exports = route.use('/menu', menuRoutes)
