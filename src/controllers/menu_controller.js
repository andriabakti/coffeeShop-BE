const {
	_insertMenu,
	_getAllMenu,
	_getMenuById,
	_updateMenu,
	_deleteMenu,
	_getSearch,
	_getTotal
} = require('../models/menu_model')
const { response, status, pageInfo } = require('../helpers/helpers')

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
			.then((_result) => {
				response(res, {}, res.statusCode, status.insert, null, null)
			})
			.catch((error) => {
				response(res, [], error.status_code, null, null, error)
			})
	},
	getAllMenu: (req, res) => {
		const search = req.query.search || null
		const sort = req.query.sort || 'menu_id'
		const order = req.query.order || 'ASC'
		const limit = Number(req.query.limit) || 3
		const page = Number(req.query.page) || 1
		const offset = (page === 0 ? 1 : page - 1) * limit

		if (search) {
			_getSearch(search)
				.then((result) => {
					totalData = result.rowCount
				})
				.catch((error) => {
					console.log(error)
				})
		} else {
			_getTotal()
				.then((result) => {
					totalData = result.rows[0].total
				})
				.catch((error) => {
					console.log(error)
				})
		}
		_getAllMenu(search, sort, order, limit, offset)
			.then((result) => {
				const count = result.rowCount
				const total = parseInt(totalData)
				const links = pageInfo(limit, page, total, count)
				response(res, result.rows, res.statusCode, status.found, links, null)
			})
			.catch((error) => {
				response(res, [], error.status_code, null, null, error)
			})
	},
	getMenuById: (req, res) => {
		const { id } = req.params
		_getMenuById(id)
			.then((result) => {
				response(res, result.rows[0], res.statusCode, status.found, null, null)
			})
			.catch((error) => {
				response(res, {}, error.status_code, null, null, error)
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
			.then((_result) => {
				response(res, {}, res.statusCode, status.update, null, null)
			})
			.catch((error) => {
				response(res, {}, error.status_code, null, null, error)
			})
	},
	deleteMenu: (req, res) => {
		const { id } = req.params
		_deleteMenu(id)
			.then((_result) => {
				response(res, {}, res.statusCode, status.delete, null, null)
			})
			.catch((error) => {
				response(res, {}, error.status_code, null, null, error)
			})
	}
}
