const { queryHelper } = require('../helpers/helper_query')

module.exports = {
  insertOrderDetail: (details) => {
    return queryHelper('INSERT INTO order_details SET ?', details)
  },
  insertOrderItem: (items) => {
    return queryHelper('INSERT INTO order_items SET ?', items)
  },
  getAllOrder: () => {
    return queryHelper(
      `SELECT order_items.*, products.* FROM order_items
      INNER JOIN products ON order_items.product_id = products.id`
    )
  },
  removeOrder: (id) => {
    return queryHelper('DELETE FROM histories WHERE id =?', id)
  }
}
