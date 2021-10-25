const { Router } = require('express')
const {
  readAllAdmin,
  readAllCustomer,
  updateUser,
  deleteUser
} = require('../controllers/controller_user')
const router = Router()

module.exports = router
  .get('/admin', readAllAdmin)
  .get('/', readAllCustomer)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser)
