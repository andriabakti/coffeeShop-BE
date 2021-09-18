const { Router } = require('express')
const menuRoutes = require('./menu')
const route = Router();

module.exports = route
  .use('/menu', menuRoutes)