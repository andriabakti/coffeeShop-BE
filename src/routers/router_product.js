const { Router } = require('express')
const {
	createProduct,
	readAllProduct,
	readProductById,
	updateProduct,
	deleteProduct
} = require('../controllers/controller_product')
const { verifyAccess } = require('../middlewares/midware_auth')
const router = Router()

module.exports = router
	.post('/', verifyAccess, createProduct)
	.get('/', verifyAccess, readAllProduct)
	.get('/:id', verifyAccess, readProductById)
	.patch('/:id', verifyAccess, updateProduct)
	.delete('/:id', verifyAccess, deleteProduct)
