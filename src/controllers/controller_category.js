const { response, status } = require('../helpers/helper_resp')
const {
	insertCategory,
	getAllCategory,
	getCategoryById,
	editCategory,
	removeCategory
} = require('../models/model_category')

module.exports = {
	createCategory: (req, res) => {
		const { name } = req.body
		const data = {
			name,
			created_at: new Date()
		}
		insertCategory(data)
			.then((_result) => {
				response(res, {}, res.statusCode, status.insert, null, null)
			})
			.catch((error) => {
				response(res, [], error.statusCode, null, null, error)
			})
	},
	readAllCategory: (_req, res) => {
		getAllCategory()
			.then((result) => {
				response(res, result, res.statusCode, status.found, null, null)
			})
			.catch((error) => {
				response(res, [], error.statusCode, null, null, error)
			})
	},
	readCategoryById: (req, res) => {
		const { id } = req.params
		getCategoryById(id)
			.then((result) => {
				response(res, result, res.statusCode, status.found, null, null)
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
				response(res, {}, res.statusCode, status.update, null, null)
			})
			.catch((error) => {
				response(res, {}, error.statusCode, null, null, error)
			})
	},
	deleteCategory: (req, res) => {
		const { id } = req.params
		removeCategory(id)
			.then((_result) => {
				response(res, {}, res.statusCode, status.delete, null, null)
			})
			.catch((error) => {
				response(res, {}, error.statusCode, null, null, error)
			})
	}
}
