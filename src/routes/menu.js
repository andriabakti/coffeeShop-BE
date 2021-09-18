const { Router } = require('express')
const {getAllMenu} = require('../controllers/menu')
const routes = Router()

module.exports = routes
  .get('/', getAllMenu)