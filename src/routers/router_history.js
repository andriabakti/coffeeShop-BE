const express = require('express')
const router = express.Router()

const {
  createOrder,
  readAllOrder,
  deleteOrder
} = require('../controllers/controller_history')
const {
  verifyAccess
} = require('../middlewares/midware_auth')

router
  .post('/', verifyAccess, createOrder)
  .get('/:id', verifyAccess, readAllOrder)
  .delete('/:id', deleteOrder)
module.exports = router
