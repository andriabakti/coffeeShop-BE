const { Router } = require('express')
const {
	insertMenu,
	getAllMenu,
	getMenuById,
	updateMenu,
	deleteMenu
} = require('../controllers/menu')
const routes = Router()

module.exports = routes
	.post('/', insertMenu)
	.get('/', getAllMenu)
	.get('/:id', getMenuById)
	.patch('/:id', updateMenu)
	.delete('/:id', deleteMenu)
