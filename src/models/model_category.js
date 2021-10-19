const { queryHelper } = require('../helpers/helper_query')

module.exports = {
	insertCategory: (data) => {
		return queryHelper('INSERT INTO categories SET ?', data)
	},
	getAllCategory: () => {
		return queryHelper('SELECT * FROM categories')
	},
	getCategoryById: (id) => {
		return queryHelper('SELECT categories.* FROM categories WHERE id = ?', id)
	},
	editCategory: (data, id) => {
		return queryHelper('UPDATE categories SET ? WHERE id = ?', [data, id])
	},
	removeCategory: (id) => {
		return queryHelper('DELETE FROM categories WHERE id = ?', id)
	}
}
