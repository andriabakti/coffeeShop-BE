const { actionQuery } = require('../helpers/helpers')

module.exports = {
	_insertMenu: ({ name, price, description, image, created_at }) => {
		const queryData = {
			text: 'INSERT INTO menu(name, price, description, image, created_at) VALUES($1, $2, $3, $4, $5)',
			values: [name, price, description, image, created_at]
		}
		return actionQuery(queryData)
	},
	_getAllMenu: () => {
		return actionQuery('SELECT * FROM menu')
	},
	_getMenuById: (id) => {
		return actionQuery('SELECT * FROM menu WHERE menu_id = $1', [id])
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
