const { Router } = require('express')
const {
  getAllMenu,
  getMenuById,
  insertMenu,
  updateMenu,
  deleteMenu
} = require('../controllers/menu')
const routes = Router()

module.exports = routes
  .get('/', getAllMenu)
  .get('/:id', getMenuById)
  .post('/', insertMenu)
  .patch('/:id', updateMenu)
  .delete('/:id', deleteMenu)