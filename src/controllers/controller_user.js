const {
  getAllCustomer,
  getAllAdmin,
  getUserDetailById,
  modifyUser,
  removeUser
} = require('../models/model_user')
const { response, message } = require('../helpers/helper_resp')

module.exports = {
  readAllCustomer: (req, res) => {
    getAllCustomer()
      .then((result) => {
        result.map((item) => {
          delete item.password
          delete item.updated_at
        })
        response(res, result, res.statusCode, message.found, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  readAllAdmin: (req, res) => {
    getAllAdmin()
      .then((result) => {
        result.map((item) => {
          delete item.password
          delete item.updated_at
        })
        response(res, result, res.statusCode, message.found, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  readUserDetail: (req, res) => {
    const { id } = req.params
    getUserDetailById(id)
      .then((result) => {
        result.map((item) => {
          delete item.user_id,
            delete item.password,
            delete item.role,
            delete item.created_at,
            delete item.updated_at
        })
        response(res, result, res.statusCode, message.found, null, null)
      })
      .catch((error) => {
        console.log(error);
        response(res, [], error.status_code, error.message, null, error)
      })
  },
  updateUser: async (req, res) => {
    const { URL } = process.env
    const { id } = req.params
    const {
      username,
      email,
      phone,
      first_name,
      last_name,
      birth_date,
      gender,
      address
    } = req.body
    const data = {
      username,
      email,
      phone,
      updated_at: new Date()
    }
    let image
    if (req.file) {
      image = req.file.path
    } else if (req.body.image === 'null') {
      image = null
    } else if (req.body.image) {
      image = req.body.image
    }
    const detail = {
      first_name,
      last_name,
      birth_date,
      gender: gender === null ? '' : gender,
      address: address === null ? '' : address,
      image,
      updated_at: new Date()
    }
    modifyUser(data, detail, id)
      .then((result) => {
        response(res, {}, res.statusCode, message.update, null, null)
      })
      .catch((error) => {
        console.log(error)
        response(
          res,
          [],
          error.statusCode,
          'Profile failed to updated',
          null,
          error
        )
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
