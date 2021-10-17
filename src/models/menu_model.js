const { actionQuery } = require('../helpers/query')

module.exports = {
	_insertMenu: (data) => {
		return actionQuery('INSERT INTO menu SET ?', data)
	},
	_getAllMenu: (search, sort, order, limit, offset) => {
		return actionQuery(
			`SELECT * FROM menu ${
				search ? `WHERE menu.name LIKE %${search}%` : ''
			} ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`
		)
	},
	_getMenuById: (id) => {
		return actionQuery('SELECT menu.* FROM menu WHERE menu_id = ?', id)
	},
	_getSearch: (search) => {
		return actionQuery('SELECT * FROM menu WHERE name LIKE ?', `%${search}%`)
	},
	_getTotal: () => {
		return actionQuery('SELECT COUNT(*) AS total FROM menu')
	},
	_updateMenu: (data, id) => {
		return actionQuery('UPDATE menu SET ? WHERE menu_id = ?', [data, id])
	},
	_deleteMenu: (id) => {
		return actionQuery('DELETE FROM menu WHERE menu_id = ?', id)
	}
}
