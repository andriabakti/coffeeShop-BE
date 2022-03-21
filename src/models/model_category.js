// helper: query
const { queryAction } = require('../helpers/helper_query')

module.exports = {
  insertCategory: (payload) => {
    return queryAction(`INSERT INTO "category"
		(name, created_at) VALUES ($1, $2)`, [payload.name, payload.created_at])
  },
  getAllCategory: () => {
    return queryAction(`SELECT * FROM "category"`)
  },
  getCategoryById: (id) => {
    return queryAction(`SELECT * FROM "category" WHERE id = $1`, [id])
  },
  editCategory: (payload, id) => {
    return queryAction(`UPDATE "category"
		SET name = $1, updated_at = $2 WHERE id = $3`,
			[payload.name, payload.updated_at, id])
  },
  removeCategory: (id) => {
    return queryAction(`DELETE FROM "category" WHERE id = $1`, [id])
  }
}
