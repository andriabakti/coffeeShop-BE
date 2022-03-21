// package: bcryptjs
const bcrypt = require('bcryptjs')
// package: jsonwebtoken
const jwt = require('jsonwebtoken')
// model: user
const {
  createUser,
  createUserDetail,
  getUserByEmail
} = require('../models/model_user')
// helper: response
const { response } = require('../helpers/helper_resp')

module.exports = {
  // async
  signUp: (req, res) => {
    const { username, email, password, phone, role } = req.body
    // check email from db with model
    // isUser = await checkEmail(email)
    // if result >= 0 ? response
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = {
      username,
      email,
      password: hash,
      phone,
      role,
      created_at: new Date()
    }
    createUser(newUser)
      .then((result) => {
        const data = {
          user_id: result.rows[0].id,
          created_at: new Date()
        }
        createUserDetail(data)
          .then((_result) => {
            response(res, [], 201, 'Register success', null, null)
          })
          .catch((error) => {
            console.log(error);
            response(res, [], error.statusCode, 'Failed to register new user', null, error)
          })
      })
  },
  signIn: (req, res) => {
    const { email, password } = req.body
    getUserByEmail(email)
      .then((result) => {
        // console.log(result)
        // response
        // if (!result) return response(res, [], res.statusCode, 'Email not found!', null, error)
        const user = result.rows[0]
        bcrypt.compare(password, user.password)
          .then((resCompare) => {
            !resCompare && response(res, [], res.statusCode, 'Password is wrong!', null, null)
            const payload = {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role
            }
            jwt.sign(
              payload, process.env.JWT_KEY, { expiresIn: '12h' }, (_err, token) => {
                user.token = token
                delete user.password
                delete user.created_at
                delete user.updated_at
                response(res, result.rows[0], res.statusCode, 'Login success', null, null)
              }
            )
          })
        // .catch((error) => {
        //   response(res, [], res.statusCode, 'Password is wrong!', null, null)
        // })
      })
      .catch((error) => {
        console.log(error)
        response(res, [], error.statusCode, 'Failed to login', null, error)
      })
  }
}
