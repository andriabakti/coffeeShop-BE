// package: express
const { Router } = require('express')
// controller: auth
const {
  signUp,
  signIn
} = require('../controllers/controller_auth')

// usage: express-router
const router = Router()

router
  .post('/sign-up', signUp)
  .post('/sign-in', signIn)
module.exports = router
