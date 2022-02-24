const { queryHelper } = require('../helpers/helper_query')

module.exports = {
  insertOrderDetail: (details) => {
    return queryHelper('INSERT INTO order_details SET ?', details)
  },
  insertOrderItem: (order, id, items) => {
    return queryHelper('INSERT INTO order_items (order_id, user_id, product_id, quantity, size, delivery, created_at) VALUES ?',
      [items.map(item => [order, id, item.id, item.quantity, item.size, item.delivery, new Date()])]
    )
  },
  getAllOrder: (order, limit, offset, id) => {
    return queryHelper(
      `SELECT order_items.*, products.* FROM order_items
      INNER JOIN products ON order_items.product_id = products.id
      WHERE order_items.user_id = ${id}
      ORDER BY order_items.id ${order} LIMIT ${limit} OFFSET ${offset}`
    )
  },
  getTotal: () => {
    return queryHelper(`SELECT COUNT(*) AS total FROM order_items`)
  },
  removeOrder: (id) => {
    return queryHelper('DELETE FROM histories WHERE id =?', id)
  }
}
