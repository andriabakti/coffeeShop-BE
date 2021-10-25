const express = require('express')
const router = express.Router()

const {
  signUp,
  signIn
} = require('../controllers/controller_auth')

router
  .post('/sign-up', signUp)
  .post('/sign-in', signIn)
module.exports = router