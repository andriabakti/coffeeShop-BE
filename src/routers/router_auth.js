const express = require('express')
const {
  signUp,
  signIn
} = require('../controllers/controller_auth')

const router = express.Router()

module.exports = router
  .post('/sign-up', signUp)
  .post('/sign-in', signIn)