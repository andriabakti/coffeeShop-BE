const { queryHelper } = require('../helpers/helper_query')

module.exports = {
  insertOrderDetail: (details) => {
    return queryHelper('INSERT INTO order_details SET ?', details)
  },
  insertOrderItem: (items) => {
    return queryHelper('INSERT INTO order_items SET ?', items)
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
