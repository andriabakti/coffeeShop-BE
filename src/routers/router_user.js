const express = require('express')
const router = express.Router()

const {
  readAllAdmin,
  readAllCustomer,
  updateUser,
  deleteUser
} = require('../controllers/controller_user')

router
  .get('/admin', readAllAdmin)
  .get('/', readAllCustomer)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser)
module.exports = router