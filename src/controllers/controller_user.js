const {
  getAllCustomer,
  getAllAdmin,
  getUserDetailById,
  checkImage,
  modifyUser,
  removeUser
} = require('../models/model_user')
const { response, message } = require('../helpers/helper_resp')
const fs = require('fs')

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
        response(res, [], error.statusCode, null, null, error)
      })
  },
  updateUser: async (req, res) => {
    const { URL } = process.env
    const { id } = req.params
    const image = req.file ? `${URL}/uploads/${req.file.filename}` : null
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
    const detail = {
      first_name,
      last_name,
      birth_date,
      gender,
      address,
      image,
      updated_at: new Date()
    }
    await checkImage(id).then((result) => {
      if (
        result[0].image !== null &&
        image === null
      ) {
        let oldImage = result[0].image.slice(30)
        fs.unlink(`./uploads/${oldImage}`, (err) => {
          if (!err) {
            console.log(`Stored image: ${oldImage} is succesfully deleted`)
          } else {
            console.log(err)
          }
        })
      }
    })
    await modifyUser(data, detail, id)
      .then((result) => {
        response(res, {}, res.statusCode, message.update, null, null)
      })
      .catch((error) => {
        console.log(error)
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
