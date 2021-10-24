const { Router } = require('express')
const {
  signUp,
  signIn,
  readAllAdmin,
  readAllCustomer,
  updateUser,
  deleteUser
} = require('../controllers/controller_user')
const router = Router()

module.exports = router
  .post('/sign-up', signUp)
  .post('/sign-in', signIn)
  .get('/admin', readAllAdmin)
  .get('/', readAllCustomer)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser)
