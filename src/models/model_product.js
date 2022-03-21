// helper: query
const { queryAction } = require('../helpers/helper_query')

module.exports = {
  insertProduct: (payload) => {
		return queryAction(`INSERT INTO "product"
		(name, price, description, category_id, image, created_at) VALUES ($1, $2, $3, $4, $5, $6)`,
			[payload.name, payload.price, payload.description, payload.category_id, payload.image, payload.created_at])
  },
  getAllProduct: (search, filter, sort, order, limit, offset) => {
    let query = ''
    if (search !== '' && filter !== '') {
      query = `AND name LIKE '%${search}%' AND category_id = ${filter}`
    } else if (search !== '' && filter === '') {
      query = `AND name LIKE '%${search}%'`
    } else if (filter !== '' && search === '') {
      query = `AND category_id = ${filter}`
    }
    return queryAction(
      `SELECT * FROM "product" WHERE is_deleted = yes ${query}
			ORDER BY $1 ${order} LIMIT $2 OFFSET $3`,
			[sort, limit, offset]
    )
  },
  getProductById: (id) => {
    return queryAction(`SELECT * FROM "product" WHERE id = $1`, id)
  },
  getSearch: (search, filter) => {
    return queryAction(
			`SELECT * FROM "product" WHERE
			${filter ? `category_id = ${filter} AND` : ''} name LIKE '%${search}%'`
    )
  },
  getTotal: (filter) => {
    return queryAction(
			`SELECT COUNT(*) AS total FROM "product"
			${filter ? `WHERE category_id = ${filter}` : ''}`
    )
  },
  editProduct: (payload, id) => {
		return queryAction(`UPDATE "product"
		SET name = $1, price = $2, description = $3, category_id = $4, image = $5, updated_at = $6, WHERE id = $7`,
			[payload.name, payload.price, payload.description, payload.category_id, payload.image, payload.updated_at, id])
  },
  removeProduct: (payload, id) => {
		return queryAction(`UPDATE "product"
		SET is_deleted = $1, deleted_at = $2 WHERE id = $3`,
			[payload.is_deleted, payload.deleted_at, id])
  }
}
