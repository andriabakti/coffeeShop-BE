const {
  getAllAdmin,
  getAllCustomer,
  modifyUser,
  removeUser
} = require('../models/model_user')
const {
  response,
  message
} = require('../helpers/helper_resp')

module.exports = {
  readAllAdmin: (req, res) => {
    getAllAdmin()
      .then((result) => {
        result.map(item => {
          delete item.password
          delete item.updated_at
        })
        response(res, result, res.statusCode, message.found, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  readAllCustomer: (req, res) => {
    getAllCustomer()
      .then((result) => {
        result.map(item => {
          delete item.password
          delete item.updated_at
        })
        response(res, result, res.statusCode, message.found, null, null)
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
        response(res, {}, res.statusCode, message.update, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  deleteUser: (req, res) => {
    const { id } = req.params
    removeUser(id)
      .then((result) => {
        response(res, {}, res.statusCode, message.delete, null, null)
      })
      .catch((error) => {
        response(res, {}, error.statusCode, null, null, error)
      })
  }
}
