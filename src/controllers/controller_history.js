const {
  insertOrderDetail,
  insertOrderItem,
  getAllOrder,
  getTotal,
  removeOrder
} = require('../models/model_history')
const { response, message, pageInfo } = require('../helpers/helper_resp')

module.exports = {
  createOrder: (req, res) => {
    const { id, total, payment, items } = req.body
    const details = {
      user_id: id,
      total,
      payment,
      created_at: new Date()
    }
    insertOrderDetail(details)
      .then((result) => {
        let order_id = result.insertId
        insertOrderItem(order_id, id, items)
          .then((result) => {
            response(res, {}, res.statusCode, message.insert, null, null)
          })
          .catch((error) => {
            console.log(error);
            response(res, error, error.status_code, error.message, null, error)
          })
      })
      .catch((error) => {
        console.log(error);
        response(res, error, error.status_code, error.message, null, error)
      })
  },
  readAllOrder: (req, res) => {
    const order = req.query.order || 'DESC'
    const limit = Number(req.query.limit) || 3
    const page = Number(req.query.page) || 1
    const offset = (page === 0 ? 1 : page - 1) * limit
    const { id } = req.params

    getTotal()
      .then((result) => {
        totalData = result[0].total
      })
      .catch((error) => {
        console.log(error)
      })
    getAllOrder(order, limit, offset, id)
      .then((result) => {
        const count = result.length
        const total = parseInt(totalData)
        const links = pageInfo(limit, page, total, count)
        response(res, result, res.statusCode, message.found, links, null)
      })
      .catch((error) => {
        console.log(error)
        response(res, error, error.status_code, error.message, null, error)
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
