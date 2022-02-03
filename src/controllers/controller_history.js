const { response, message } = require('../helpers/helper_resp')
const { insertHistory, getAllHistory, removeHistory } = require('../models/model_history')

module.exports = {
  createHistory: (req, res) => {
    const { user_id, name, price, status, image } = req.body
    const data = {
      user_id,
      name,
      price,
      status,
      image,
      created_at: new Date()
    }
    insertHistory(data)
      .then((_result) => {
        response(res, {}, res.statusCode, message.insert, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  readAllHistory: (_req, res) => {
    getAllHistory()
      .then((result) => {
        response(res, result, res.statusCode, message.found, null, null)
      })
      .catch((error) => {
        response(res, [], error.statusCode, null, null, error)
      })
  },
  deleteHistory: (req, res) => {
    const { id } = req.params
    removeHistory(id)
      .then((_result) => {
        response(res, {}, res.statusCode, message.delete, null, null)
      })
      .catch((error) => {
        response(res, {}, error.statusCode, null, null, error)
      })
  }
}