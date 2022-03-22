// helper: query
const { queryAction } = require('../helpers/helper_query')

module.exports = {
  insertProduct: (payload) => {
    const { name, price, description, category_id, image, created_at } = payload
		return queryAction(`INSERT INTO "product"
		(name, price, description, category_id, image, created_at) VALUES ($1, $2, $3, $4, $5, $6)`,
			[name, price, description, category_id, image, created_at])
  },
  getAllProduct: (search, filter, sort, order, limit, offset) => {
    let query = ''
    if (search !== '' && filter !== '') {
      query = `AND name ILIKE '%${search}%' AND category_id = ${filter}`
    } else if (search !== '' && filter === '') {
      query = `AND name ILIKE '%${search}%'`
    } else if (filter !== '' && search === '') {
      query = `AND category_id = ${filter}`
    }
    return queryAction(
      `SELECT * FROM "product" WHERE is_deleted = $1 ${query}
			ORDER BY $2 ${order} LIMIT $3 OFFSET $4`,
			[0, sort, limit, offset]
    )
  },
  getProductById: (id) => {
    return queryAction(`SELECT * FROM "product" WHERE id = $1`, [id])
  },
  getSearch: (search, filter) => {
    return queryAction(
			`SELECT * FROM "product" WHERE
			${filter ? `category_id = ${filter} AND` : ''} name ILIKE '%${search}%'`
    )
  },
  getTotal: (filter) => {
    return queryAction(
			`SELECT COUNT(*) AS total FROM "product"
			${filter ? `WHERE category_id = ${filter}` : ''}`
    )
  },
  editProduct: (payload, id) => {
    const { name, price, description, category_id, image, updated_at } = payload
		return queryAction(`UPDATE "product"
		SET (name, price, description, category_id, image, updated_at) =
    ($1, $2, $3, $4, $5, $6) WHERE id = $7`,
			[name, price, description, category_id, image, updated_at, id])
  },
  removeProduct: (payload, id) => {
		return queryAction(`UPDATE "product"
		SET is_deleted = $1, deleted_at = $2 WHERE id = $3`,
			[payload.is_deleted, payload.deleted_at, id])
  }
}
