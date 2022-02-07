const { response, message } = require('../helpers/helper_resp')
const { insertOrderDetail, insertOrderItem, getAllOrder, removeOrder } = require('../models/model_history')

module.exports = {
  createOrder: (req, res) => {
    const { id, total, payment } = req.body
    const details = {
      user_id: id,
      total,
      payment,
      created_at: new Date()
    }

    insertOrderDetail(details)
      .then((result) => {
        let order_id = result.insertId
        req.body.items.map(item => {
          const data = {
            order_id: order_id,
            product_id: item.id,
            quantity: item.quantity,
            size: item.size,
            delivery: item.delivery,
            created_at: new Date()
          }
          insertOrderItem(data)
            .then((_result) => {
              response(res, {}, res.statusCode, message.insert, null, null)
            })
            .catch((error) => {
              response(res, [], error.statusCode, null, null, error)
            })
          // response(res, {}, res.statusCode, message.insert, null, null)
        })
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  readAllOrder: (_req, res) => {
    getAllOrder()
      .then((result) => {
        response(res, result, res.statusCode, message.found, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  deleteOrder: (req, res) => {
    const { id } = req.params
    removeOrder(id)
      .then((_result) => {
        response(res, {}, res.statusCode, message.delete, null, null)
      })
      .catch((error) => {
        response(res, {}, error.statusCode, null, null, error)
      })
  }
}