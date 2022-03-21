// model: category
const {
  insertCategory,
  getAllCategory,
  getCategoryById,
  editCategory,
  removeCategory
} = require('../models/model_category')
// helper: response
const { response } = require('../helpers/helper_resp')

module.exports = {
  createCategory: (req, res) => {
    const { name } = req.body
    const data = {
      name,
      created_at: new Date()
    }
    insertCategory(data)
      .then((_result) => {
        response(res, [], res.statusCode, "New category created successfully", null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  readAllCategory: (_req, res) => {
    getAllCategory()
      .then((result) => {
        response(res, result.rows, res.statusCode, "Categories found", null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  readCategoryById: (req, res) => {
    const { id } = req.params
    getCategoryById(id)
      .then((result) => {
        response(res, result.rows, res.statusCode, "Category found", null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  updateCategory: (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const data = {
      name,
      updated_at: new Date()
    }
    editCategory(data, id)
      .then((_result) => {
        response(res, [], res.statusCode, "Category updated successfully", null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  deleteCategory: (req, res) => {
    const { id } = req.params
    removeCategory(id)
      .then((_result) => {
        response(res, [], res.statusCode, "Category deleted successfully", null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  }
}
