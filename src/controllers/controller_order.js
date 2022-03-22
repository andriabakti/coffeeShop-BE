// model: order
const {
  insertOrderDetail,
  insertOrderItem,
  getAllOrder,
  getTotal,
  removeOrder
} = require('../models/model_order')
// helper: response
const {
  response,
  pageInfo
} = require('../helpers/helper_resp')

module.exports = {
  createOrder: async (req, res) => {
    const { id, total, payment, items } = req.body
    const payload = {
      user_id: id,
      total,
      payment,
      created_at: new Date()
    }
    try {
      const detail = await insertOrderDetail(payload)
      let order_id = detail.rows[0].id
      await insertOrderItem(order_id, id, items)
      response(res, [], res.statusCode, "Order(s) created successfully", null, null)
    } catch (error) {
      console.log(error);
      response(res, [], error.statusCode, "Failed to create order(s)", null, error)
    }
  },
  readAllOrder: (req, res) => {
    const order = req.query.order || 'DESC'
    const limit = Number(req.query.limit) || 3
    const page = Number(req.query.page) || 1
    const offset = (page === 0 ? 1 : page - 1) * limit
    const { id } = req.params
    let totalData

    getTotal()
      .then((result) => {
        totalData = result.rows[0].total
      })
      .catch((error) => {
        console.log(error)
      })
    getAllOrder(order, limit, offset, id)
      .then((result) => {
        const count = result.rows.length
        const total = parseInt(totalData)
        const links = pageInfo(limit, page, total, count)
        response(res, result.rows, res.statusCode, "Orders found", links, null)
      })
      .catch((error) => {
        console.log(error)
        response(res, [], error.statusCode, "Orders not found", null, error)
      })
  },
  deleteOrder: (req, res) => {
    const { id } = req.params
    removeOrder(id)
      .then((_result) => {
        response(res, [], res.statusCode, "Order deleted successfully", null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, "Failed to delete this order", null, error)
      })
  }
}
