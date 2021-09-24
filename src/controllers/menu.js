const {
	_insertMenu,
	_getAllMenu,
	_getMenuById,
	_updateMenu,
	_deleteMenu
} = require('../models/menu')
const { response } = require('../helpers/helpers')

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
				response(res, result, 200, null)
			})
			.catch((error) => {
				console.log(error.message)
			})
	},
	getAllMenu: (_req, res) => {
		_getAllMenu()
			.then((result) => {
				response(res, result, 200, null)
			})
			.catch((error) => {
				console.log(error.message)
			})
	},
	getMenuById: (req, res) => {
		const { id } = req.params
		_getMenuById(id)
			.then((result) => {
				response(res, result, 200, null)
			})
			.catch((error) => {
				console.log(error.message)
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
