const { Router } = require('express')
const {
	insertProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct
} = require('../controllers/product_controller')
const routes = Router()

routes
	.post('/', insertProduct)
	.get('/', getAllProducts)
	.get('/:id', getProductById)
	.patch('/:id', updateProduct)
	.delete('/:id', deleteProduct)
module.exports = routes
