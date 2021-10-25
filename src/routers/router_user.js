const {
  readAllAdmin,
  readAllCustomer,
  updateUser,
  deleteUser
} = require('../controllers/controller_user')

const express = require('express')
const router = express.Router()

router
  .get('/admin', readAllAdmin)
  .get('/customer', readAllCustomer)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser)
module.exports = router