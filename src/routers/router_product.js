const { Router } = require('express')
const {
	createProduct,
	readAllProduct,
	readProductById,
	updateProduct,
	deleteProduct
} = require('../controllers/controller_product')
const router = Router()

module.exports = router
	.post('/', createProduct)
	.get('/', readAllProduct)
	.get('/:id', readProductById)
	.patch('/:id', updateProduct)
	.delete('/:id', deleteProduct)
