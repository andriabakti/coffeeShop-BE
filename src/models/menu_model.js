const { actionQuery } = require('../helpers/query')

module.exports = {
	_insertMenu: ({ name, price, description, image, created_at }) => {
		const queryData = {
			text: 'INSERT INTO menu(name, price, description, image, created_at) VALUES($1, $2, $3, $4, $5)',
			values: [name, price, description, image, created_at]
		}
		return actionQuery(queryData)
	},
	_getAllMenu: (search, sort, order, limit, offset) => {
		return actionQuery(
			`SELECT * FROM menu ${
				search ? `WHERE menu.name LIKE %${search}%` : ''
			} ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`
		)
	},
	_getMenuById: (id) => {
		return actionQuery('SELECT * FROM menu WHERE menu_id = $1', [id])
	},
	_getSearch: (search) => {
		return actionQuery('SELECT * FROM menu WHERE name LIKE', [`%${search}%`])
	},
	_getTotal: () => {
		return actionQuery('SELECT COUNT(*) AS total FROM menu')
	},
	_updateMenu: ({ name, price, description, image, updated_at }, id) => {
		const queryData = {
			text: 'UPDATE menu SET name = $1, price = $2, description = $3, image = $4, updated_at = $5 WHERE menu_id = $6',
			values: [name, price, description, image, updated_at, id]
		}
		return actionQuery(queryData)
	},
	_deleteMenu: (id) => {
		return actionQuery('DELETE FROM menu WHERE menu_id = $1', [id])
	}
}
