const {
  getAllCustomer,
  getAllAdmin,
  getUserDetailById,
  modifyUser,
  modifyUserDetail,
  removeUser
} = require('../models/model_user')
const { response } = require('../helpers/helper_resp')

module.exports = {
  readAllCustomer: (_req, res) => {
    getAllCustomer()
      .then((result) => {
        result.rows.map((item) => {
          delete item.password
          delete item.updated_at
        })
        response(res, result.rows, res.statusCode, "All customer users found", null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, "Data not found", null, error)
      })
  },
  readAllAdmin: (_req, res) => {
    getAllAdmin()
      .then((result) => {
        result.rows.map((item) => {
          delete item.password
          delete item.updated_at
        })
        response(res, result.rows, res.statusCode, "All admin users found", null, null)
      })
      .catch((error) => {
        console.log(error);
        response(res, [], error.statusCode, "Data not found", null, error)
      })
  },
  readUserDetail: (req, res) => {
    const { id } = req.params
    getUserDetailById(id)
      .then((result) => {
        result.rows.map((item) => {
          delete item.user_id,
            delete item.password,
            delete item.role,
            delete item.created_at,
            delete item.updated_at
        })
        response(res, result.rows, res.statusCode, "User detail found", null, null)
      })
      .catch((error) => {
        console.log(error);
        response(res, [], error.statusCode, "User detail not found", null, error)
      })
  },
  updateUser: async (req, res) => {
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
      username: username === 'null' ? '' : username,
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
      gender: gender === 'null' ? null : gender,
      address: address === 'null' ? null : address,
      image,
      updated_at: new Date()
    }
    try {
      await modifyUser(data, id)
      await modifyUserDetail(detail, id)
      response(res, [], res.statusCode, "User profile updated successfully", null, null)
    } catch (error) {
      console.log(error)
      response(res, [], error.statusCode, 'Failed to update user profile', null, error)
    }
  },
  deleteUser: (req, res) => {
    const { id } = req.params
    removeUser(id)
      .then((_result) => {
        response(res, [], res.statusCode, "User deleted successfully", null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, "Failed to delete user", null, error)
      })
  }
}
