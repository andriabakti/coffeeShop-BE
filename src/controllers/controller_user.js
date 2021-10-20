const { genSalt, hash, compare } = require('bcryptjs')
const { register, login, getUserByEmail } = require('../models/model_user')
const { response, status } = require('../helpers/helper_resp')

module.exports = {
  // async
  signUp: (req, res) => {
    const { name, email, password, phone } = req.body
    // check email from db with model
    // isUser = await checkEmail(email)
    // if result >= 0 ? response
    const data = {
      name,
      email,
      password,
      phone,
      role: 2,
      created_at: new Date()
    }
    genSalt(10, (_err, salt) => {
      hash(data.password, salt, (_err, hash) => {
        data.password = hash
        register(data)
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
    const { email, password } = req.body
    getUserByEmail(email)
      .then((result) => {
        console.log(result[0]);
        // response
        // if (!result) return response(res, [], res.status_code, 'Email not found!', null, error)
        const user = result[0]
        compare(password, user.password).then((resCompare) => {
          !resCompare && response(res, {}, res.status_code, 'Password is wrong!', null, error)
          delete user.password
          delete user.created_at
          delete user.updated_at
          response(res, result[0], res.statusCode, 'Login success', null, null)
        })
      })
      .catch((error) => {
        response(res, [], error.status_code, 'Login failed', null, error)
      })
    // login()
  }
}
