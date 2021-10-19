const {
	insertProduct,
	getAllProduct,
	getProductById,
	editProduct,
	removeProduct,
	getSearch,
	getTotal
} = require('../models/model_product')
const { response, status, pageInfo } = require('../helpers/helper_resp')

module.exports = {
	createProduct: (req, res) => {
		const { name, price, description, category_id, image } = req.body
		const data = {
			name,
			price,
			description,
			category_id,
			image,
			created_at: new Date()
		}
		insertProduct(data)
			.then((_result) => {
				response(res, {}, res.statusCode, status.insert, null, null)
			})
			.catch((error) => {
				response(res, [], error.statusCode, null, null, error)
			})
	},
	readAllProduct: (req, res) => {
		const search = req.query.search || null
		const sort = req.query.sort || 'id'
		const order = req.query.order || 'ASC'
		const limit = Number(req.query.limit) || 3
		const page = Number(req.query.page) || 1
		const offset = (page === 0 ? 1 : page - 1) * limit

		if (search) {
			getSearch(search)
				.then((result) => {
					totalData = result.length
				})
				.catch((error) => {
					console.log(error)
				})
		} else {
			getTotal()
				.then((result) => {
					totalData = result[0].total
				})
				.catch((error) => {
					console.log(error)
				})
		}
		getAllProduct(search, sort, order, limit, offset)
			.then((result) => {
				const count = result.length
				const total = parseInt(totalData)
				const links = pageInfo(limit, page, total, count)
				response(res, result, res.statusCode, status.found, links, null)
			})
			.catch((error) => {
				response(res, [], error.statusCode, null, null, error)
			})
	},
	readProductById: (req, res) => {
		const { id } = req.params
		getProductById(id)
			.then((result) => {
				response(res, result, res.statusCode, status.found, null, null)
			})
			.catch((error) => {
				response(res, {}, error.statusCode, null, null, error)
			})
	},
	updateProduct: (req, res) => {
		const { id } = req.params
		const { name, price, description, category_id, image } = req.body
		const data = {
			name,
			price,
			description,
			category_id,
			image,
			updated_at: new Date()
		}
		editProduct(data, id)
			.then((_result) => {
				response(res, {}, res.statusCode, status.update, null, null)
			})
			.catch((error) => {
				response(res, {}, error.statusCode, null, null, error)
			})
	},
	deleteProduct: (req, res) => {
		const { id } = req.params
		removeProduct(id)
			.then((_result) => {
				response(res, {}, res.statusCode, status.delete, null, null)
			})
			.catch((error) => {
				response(res, {}, error.statusCode, null, null, error)
			})
	}
}
