// package: pg-format
const format = require("pg-format")
// helper: query
const { queryAction } = require('../helpers/helper_query')

module.exports = {
  insertOrderDetail: (payload) => {
    return queryAction(`INSERT INTO "order_detail"
    (user_id, total, payment, created_at) VALUES ($1, $2, $3, $4) RETURNING id`,
      [payload.user_id, payload.total, payload.payment, payload.created_at])
  },
  insertOrderItem: (order_id, user_id, payload) => {
    const items = payload.map(({ id, quantity, size, delivery }) => {
      return [order_id, user_id, id, quantity, size, delivery, new Date()]
    })
    return queryAction(format(`INSERT INTO "order_item"
      (order_id, user_id, product_id, quantity, size, delivery, created_at) VALUES %L`,
      items
    ))
  },
  getTotal: () => {
    return queryAction(`SELECT COUNT(*) AS total FROM "order_item"`)
  },
  getAllOrder: (order, limit, offset, id) => {
    return queryAction(
      `SELECT a.*, b.* FROM "order_item" a
      INNER JOIN "product" b ON a.product_id = b.id
      WHERE a.user_id = $1 ORDER BY a.id ${order}
      LIMIT $2 OFFSET $3`, [id, limit, offset]
    )
  },
  removeOrder: (id) => {
    return queryAction(`DELETE FROM "order_detail" WHERE id = $1`, [id])
  }
}
