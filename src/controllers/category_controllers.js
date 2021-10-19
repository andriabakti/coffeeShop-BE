const { response, status } = require('../helpers/response')
const {
	newCategory,
	fetchCategories,
	fetchCategoryById,
	editCategory,
	removeCategory
} = require('../models/category_models')

module.exports = {
	insertCategory: (req, res) => {
		const { name } = req.body
		const data = {
			name,
			created_at: new Date()
		}
		newCategory(data)
			.then((_result) => {
				response(res, {}, res.statusCode, status.insert, null, null)
			})
			.catch((error) => {
				response(res, [], error.statusCode, null, null, error)
			})
	},
	getAllCategories: (_req, res) => {
		fetchCategories()
			.then((result) => {
				response(res, result, res.statusCode, status.found, null, null)
			})
			.catch((error) => {
				response(res, [], error.statusCode, null, null, error)
			})
	},
	getCategoryById: (req, res) => {
		const { id } = req.params
		fetchCategoryById(id)
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
