const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
  registerUser,
  getUserByEmail
} = require('../models/model_user')
const {
  response
} = require('../helpers/helper_resp')

module.exports = {
  // async
  signUp: (req, res) => {
    const { username, email, password, phone, role } = req.body
    // check email from db with model
    // isUser = await checkEmail(email)
    // if result >= 0 ? response
    const rounds = 10
    bcrypt.genSalt(rounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        const newUser = {
          username,
          email,
          password: hash,
          phone,
          role,
          status: 2
        }
        registerUser(newUser)
          .then((result) => {
            response(res, result, res.statusCode, 'Register success', null, null)
          })
          .catch((error) => {
            response(res, [], 400, 'Register failed', null, error)
          })
      })
    })
  },
  signIn: (req, res) => {
    const { email, password } = req.body
    getUserByEmail(email)
      .then((result) => {
        // console.log(result)
        // response
        // if (!result) return response(res, [], res.status_code, 'Email not found!', null, error)
        const user = result[0]
        bcrypt.compare(password, user.password)
          .then((resCompare) => {
            !resCompare && response(res, {}, res.status_code, 'Password is wrong!', null, null)
            const payload = {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role
            }
            jwt.sign(
              payload, process.env.JWT_KEY, { expiresIn: '12h' }, (err, token) => {
                user.token = token
                delete user.password
                delete user.created_at
                delete user.updated_at
                response(res, result[0], res.statusCode, 'Login success', null, null)
              }
            )
          })
        // .catch((error) => {
        //   response(res, {}, res.statusCode, 'Password is wrong!', null, null)
        // })
      })
      .catch((error) => {
        console.log(error)
        response(res, [], res.status_code, 'Login failed', null, error)
      })
  }
}