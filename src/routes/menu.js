const { Router } = require('express')
const {getAllMenu, insertMenu} = require('../controllers/menu')
const routes = Router()

module.exports = routes
  .get('/', getAllMenu)
  .post('/', insertMenu)