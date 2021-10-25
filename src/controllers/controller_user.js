const {
  getAllAdmin,
  getAllCustomer,
  modifyUser,
  removeUser
} = require('../models/model_user')
const {
  response,
  status
} = require('../helpers/helper_resp')

module.exports = {
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
