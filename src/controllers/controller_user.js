const {
  genSalt,
  hash,
  compare
} = require('bcryptjs')
const {
  sign
} = require('jsonwebtoken')
const {
  registerUser,
  getUserByEmail,
  getAllAdmin,
  getAllCustomer,
  modifyUser,
  removeUser
} = require('../models/model_user')
const {
  response, status
} = require('../helpers/helper_resp')

module.exports = {
  // async
  signUp: (req, res) => {
    const {
      username,
      email,
      password,
      phone,
      role
    } = req.body
    // check email from db with model
    // isUser = await checkEmail(email)
    // if result >= 0 ? response
    const data = {
      username,
      email,
      password,
      phone,
      role,
      created_at: new Date()
    }
    genSalt(10, (_err, salt) => {
      hash(data.password, salt, (_err, hash) => {
        data.password = hash
        registerUser(data)
          .then((_result) => {
            response(res, {}, res.statusCode, 'Register success', null, null)
          })
          .catch((error) => {
            response(res, [], error.statusCode, 'Register failed', null, error)
          })
      })
    })
  },
  signIn: (req, res) => {
    const {
      email,
      password
    } = req.body
    getUserByEmail(email)
      .then((result) => {
        // response
        // if (!result) return response(res, [], res.status_code, 'Email not found!', null, error)
        const user = result[0]
        compare(password, user.password).then((resCompare) => {
          !resCompare &&
            response(
              res, {},
              res.status_code,
              'Password is wrong!',
              null,
              error
            )
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
          sign(
            payload,
            process.env.JWT_KEY, {
            expiresIn: '12h'
          },
            (err, token) => {
              user.token = token
              delete user.password
              delete user.created_at
              delete user.updated_at
              response(
                res,
                result[0],
                res.statusCode,
                'Login success',
                null,
                null
              )
            }
          )
        })
        // catch
      })
      .catch((error) => {
        response(res, [], error.status_code, 'Login failed', null, error)
      })
  },
  readAllAdmin: (req, res) => {
    getAllAdmin()
      .then((result) => {
        response(res, result, res.statusCode, status.found, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  readAllCustomer: (req, res) => {
    getAllCustomer()
      .then((result) => {
        response(res, result, res.statusCode, status.found, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  updateUser: (req, res) => {
    const { id } = req.params
    const { username, email, phone } = req.body
    const data = {
      username,
      email,
      phone,
      updated_at: new Date()
    }
    modifyUser(data, id)
      .then((result) => {
        response(res, {}, res.statusCode, status.update, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  deleteUser: (req, res) => {
    const { id } = req.params
    removeUser(id)
      .then((result) => {
        response(res, {}, res.statusCode, status.delete, null, null)
      })
      .catch((error) => {
        response(res, {}, error.statusCode, null, null, error)
      })
  }
}