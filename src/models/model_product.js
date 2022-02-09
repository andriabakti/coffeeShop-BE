const { queryHelper } = require('../helpers/helper_query')

module.exports = {
	insertProduct: (data) => {
		return queryHelper('INSERT INTO products SET ?', data)
	},
	getAllProduct: (search, sort, order, limit, offset) => {
		return queryHelper(
			`SELECT * FROM products ${search ? `WHERE name LIKE '%${search}%'` : ''
			} ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`
		)
	},
	getProductById: (id) => {
		return queryHelper('SELECT products.* FROM products WHERE id = ?', id)
	},
	getSearch: (search) => {
		return queryHelper(
			'SELECT * FROM products WHERE name LIKE ?',
			`%${search}%`
		)
	},
	getTotal: () => {
		return queryHelper('SELECT COUNT(*) AS total FROM products')
	},
	editProduct: (data, id) => {
		return queryHelper('UPDATE products SET ? WHERE id = ?', [data, id])
	},
	removeProduct: (id) => {
		return queryHelper('DELETE FROM products WHERE id = ?', id)
	}
}
