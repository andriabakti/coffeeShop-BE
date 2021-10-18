const { queryHelper } = require('../helpers/query')

module.exports = {
	_insertProduct: (data) => {
		return queryHelper('INSERT INTO products SET ?', data)
	},
	_getAllProducts: (search, sort, order, limit, offset) => {
		return queryHelper(
			`SELECT * FROM products ${
				search ? `WHERE products.name LIKE %${search}%` : ''
			} ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`
		)
	},
	_getProductById: (id) => {
		return queryHelper('SELECT products.* FROM products WHERE id = ?', id)
	},
	_getSearch: (search) => {
		return queryHelper(
			'SELECT * FROM products WHERE name LIKE ?',
			`%${search}%`
		)
	},
	_getTotal: () => {
		return queryHelper('SELECT COUNT(*) AS total FROM products')
	},
	_updateProduct: (data, id) => {
		return queryHelper('UPDATE products SET ? WHERE id = ?', [data, id])
	},
	_deleteProduct: (id) => {
		return queryHelper('DELETE FROM products WHERE id = ?', id)
	}
}
