const { actionQuery } = require('../helpers/query')

module.exports = {
	_insertMenu: (data) => {
		return actionQuery('INSERT INTO products SET ?', data)
	},
	_getAllMenu: (search, sort, order, limit, offset) => {
		return actionQuery(
			`SELECT * FROM products ${
				search ? `WHERE products.name LIKE %${search}%` : ''
			} ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`
		)
	},
	_getMenuById: (id) => {
		return actionQuery('SELECT products.* FROM products WHERE id = ?', id)
	},
	_getSearch: (search) => {
		return actionQuery(
			'SELECT * FROM products WHERE name LIKE ?',
			`%${search}%`
		)
	},
	_getTotal: () => {
		return actionQuery('SELECT COUNT(*) AS total FROM products')
	},
	_updateMenu: (data, id) => {
		return actionQuery('UPDATE products SET ? WHERE id = ?', [data, id])
	},
	_deleteMenu: (id) => {
		return actionQuery('DELETE FROM products WHERE id = ?', id)
	}
}
