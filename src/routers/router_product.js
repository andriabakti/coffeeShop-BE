// package: express
const { Router } = require('express')
// middleware: auth
const { verifyAccess } = require('../middlewares/midware_auth')
// middleware: multer
const upload = require('../middlewares/midware_multer')
// controller: product
const {
  createProduct,
  readAllProduct,
  readProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/controller_product')

// usage: express-router
const router = Router()

router
  .post('/', verifyAccess, upload, createProduct)
  .get('/', verifyAccess, readAllProduct)
  .get('/:id', verifyAccess, readProductById)
  .patch('/:id', verifyAccess, upload, updateProduct)
  .delete('/:id', verifyAccess, deleteProduct)
module.exports = router
