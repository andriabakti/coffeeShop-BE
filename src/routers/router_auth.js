const {
  signUp,
  signIn
} = require('../controllers/controller_auth')

const express = require('express')
const router = express.Router()

router
  .post('/sign-up', signUp)
  .post('/sign-in', signIn)
module.exports = router