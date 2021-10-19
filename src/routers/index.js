const { Router } = require('express')
const menuRoutes = require('./product_routes')
const categoryRoutes = require('./category_routes')
const routes = Router()

routes
  .use('/menu', menuRoutes)
  .use('/categories', categoryRoutes)
module.exports = routes
