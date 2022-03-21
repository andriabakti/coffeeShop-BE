// package: express
const { Router } = require('express')
// middleware: auth
const { verifyAccess } = require('../middlewares/midware_auth')
// controller: order
const {
  createOrder,
  readAllOrder,
  deleteOrder
} = require('../controllers/controller_order')

// usage: express-router
const router = Router()

router
  .post('/', verifyAccess, createOrder)
  .get('/:id', verifyAccess, readAllOrder)
  .delete('/:id', deleteOrder)
module.exports = router
