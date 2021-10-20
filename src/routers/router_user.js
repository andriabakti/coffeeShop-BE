const { Router } = require('express')
const { signUp, signIn } = require('../controllers/controller_user')
const router = Router()

module.exports = router
  .post('/sign-up', signUp).post('/sign-in', signIn)
