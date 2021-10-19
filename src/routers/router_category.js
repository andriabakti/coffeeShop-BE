const { Router } = require('express')
const {
	createCategory,
	readAllCategory,
	readCategoryById,
	updateCategory,
	deleteCategory
} = require('../controllers/controller_category')
const router = Router()

module.exports = router
	.post('/', createCategory)
	.get('/', readAllCategory)
	.get('/:id', readCategoryById)
	.patch('/:id', updateCategory)
	.delete('/:id', deleteCategory)
