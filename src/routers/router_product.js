const express = require('express')
const router = express.Router()

const {
	createProduct,
	readAllProduct,
	readProductById,
	updateProduct,
	deleteProduct
} = require('../controllers/controller_product')
const {
	verifyAccess
} = require('../middlewares/midware_auth')
const upload = require('../middlewares/midware_multer')

router
	.post('/', verifyAccess, upload, createProduct)
	.get('/', verifyAccess, readAllProduct)
	.get('/:id', verifyAccess, readProductById)
	.patch('/:id', verifyAccess, upload, updateProduct)
	.delete('/:id', verifyAccess, deleteProduct)
module.exports = router