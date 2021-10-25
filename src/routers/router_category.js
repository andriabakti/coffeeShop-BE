const {
	createCategory,
	readAllCategory,
	readCategoryById,
	updateCategory,
	deleteCategory
} = require('../controllers/controller_category')

const express = require('express')
const router = express.Router()

router
	.post('/', createCategory)
	.get('/', readAllCategory)
	.get('/:id', readCategoryById)
	.patch('/:id', updateCategory)
	.delete('/:id', deleteCategory)
module.exports = router