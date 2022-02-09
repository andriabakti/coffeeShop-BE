const {
	insertProduct,
	getAllProduct,
	getProductById,
	editProduct,
	removeProduct,
	getSearch,
	getTotal
} = require('../models/model_product')
const { response, message, pageInfo } = require('../helpers/helper_resp')
const fs = require('fs')

module.exports = {
	createProduct: (req, res) => {
		const { name, price, description, category_id } = req.body
		const { URL } = process.env
		const image = req.file ? `${URL}/uploads/${req.file.filename}` : null
		const data = {
			name,
			price,
			description,
			category_id,
			image,
			created_at: new Date()
		}
		insertProduct(data)
			.then((result) => {
				response(res, {}, res.statusCode, message.insert, null, null)
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
				response(res, result, res.statusCode, message.found, links, null)
			})
			.catch((error) => {
				response(res, [], error.statusCode, null, null, error)
			})
	},
	readProductById: (req, res) => {
		const { id } = req.params
		getProductById(id)
			.then((result) => {
				response(res, result, res.statusCode, message.found, null, null)
			})
			.catch((error) => {
				response(res, {}, error.statusCode, null, null, error)
			})
	},
	updateProduct: async (req, res) => {
		const { id } = req.params
		const { name, price, description, category_id } = req.body
		const { URL } = process.env
		const data = {
			name,
			price,
			description,
			category_id,
			image: `${URL}/uploads/${req.file.filename}`,
			updated_at: new Date()
		}
		await getProductById(id)
			.then((result) => {
				if (result[0].image !== null) {
					let image = result[0].image.slice(30)
					fs.unlink(`./uploads/${image}`, (err) => {
						if (!err) {
							console.log(`Stored image: ${image} is succesfully deleted`);
						} else {
							console.log(err);
						}
					})
				}
			})
		await editProduct(data, id)
			.then((result) => {
				response(res, {}, res.statusCode, message.update, null, null)
			})
			.catch((error) => {
				response(res, {}, error.statusCode, null, null, error)
			})
	},
	deleteProduct: async (req, res) => {
		const { id } = req.params
		await getProductById(id)
			.then((result) => {
				if (result[0].image !== null) {
					let image = result[0].image.slice(30)
					fs.unlink(`./uploads/${image}`, (err) => {
						if (!err) {
							console.log(`Stored image: ${image} is succesfully deleted`);
						} else {
							console.log(err);
						}
					})
				}
			})
		await removeProduct(id)
			.then((result) => {
				response(res, {}, res.statusCode, message.delete, null, null)
			})
			.catch((error) => {
				response(res, {}, error.statusCode, null, null, error)
			})
	}
}
