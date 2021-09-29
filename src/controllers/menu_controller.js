const {
	_insertMenu,
	_getAllMenu,
	_getMenuById,
	_updateMenu,
	_deleteMenu,
	_getSearch,
	_getTotal
} = require('../models/menu_model')
const { response, status, pageInfo, errors } = require('../helpers/helpers')

module.exports = {
	insertMenu: (req, res) => {
		const { name, price, description, image } = req.body
		const data = {
			name,
			price,
			description,
			image,
			created_at: new Date()
		}
		_insertMenu(data)
			.then((result) => {
				response(res, result, res.statusCode, status.insert, null, null)
			})
			.catch((error) => {
				response(res, [], err.statusCode, null, null, error)
			})
	},
	getAllMenu: (req, res) => {
		const limit = req.query.limit || 5
		const page = !req.query.page ? 1 : req.query.page
		const offset = (page === 0 ? 1 : page - 1) * limit
		const search = req.query.search || null
		const sort = req.query.sort || 'menu_id'
		const order = req.query.order || 'ASC'

		if (search) {
			_getSearch(search)
				.then((result) => {
					totalData = result.rows.length
				})
				.catch((error) => {
					console.log(error)
				})
		}
		// else {
		// 	_getTotal()
		// 		.then((result) => {
		// 			totalData = result.rows[0].total
		// 		})
		// 		.catch((error) => {
		// 			console.log(error.message)
		// 		})
		// }
		_getAllMenu(search, sort, order, limit, offset)
			.then((result) => {
				const count = result.rows.length
				const total = result.rowCount
				const links = pageInfo(limit, page, total, count)
				response(res, result.rows, 200, status.found, links, null)
			})
			.catch((error) => {
				response(
					res,
					[],
					errors.notFound.statusCode,
					errors.notFound.sqlMessage,
					null,
					error
				)
			})
	},
	getMenuById: (req, res) => {
		const { id } = req.params
		_getMenuById(id)
			.then((result) => {
				response(res, result.rows[0], 200, status.found, null, null)
			})
			.catch((error) => {
				console.log(error)
				response(
					res,
					[],
					errors.notFound.statusCode,
					errors.notFound.sqlMessage,
					null,
					error
				)
			})
	},
	updateMenu: (req, res) => {
		const { id } = req.params
		const { name, price, description, image } = req.body
		const data = {
			name,
			price,
			description,
			image,
			updated_at: new Date()
		}
		_updateMenu(data, id)
			.then((result) => {
				response(res, result, 200, null)
			})
			.catch((error) => {
				console.log(error.message)
			})
	},
	deleteMenu: (req, res) => {
		const { id } = req.params
		_deleteMenu(id)
			.then((result) => {
				response(res, result, 200, null)
			})
			.catch((error) => {
				console.log(error.message)
			})
	}
}
