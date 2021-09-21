const {_getAllMenu, _getMenuById, _insertMenu, _updateMenu, _deleteMenu } = require('../models/menu')
const { response } = require('../helpers/helpers')

module.exports = {
  getAllMenu: (_req, resp) => {
    _getAllMenu()
      .then((res) => {
        response(resp, res, 200, null)
      })
      .catch((err) => {
        console.log(err.message);
      })
  },
  getMenuById: (req, resp) => {
    const {id} = req.params
    _getMenuById(id)
      .then((res) => {
        response(resp, res, 200, null)
      })
      .catch((err) => {
        console.log(err.message)
      })
  },
  insertMenu: (req, resp) => {
    const {name, price, description, image} = req.body
    const data = {
      name,
      price,
      description,
      image,
      created_at: new Date(),
      updated_at: null
    }
    _insertMenu(data)
      .then((res) => {
        response(resp, res, 200, null)
      })
      .catch((err) => {
        console.log(err.message)
      })
  },
  updateMenu: (req, resp) => {
    const { id } = req.params
    const { name, price, description, image } = req.body
    const data = {
      name,
      price,
      description,
      image,
      updated_at: new Date()
    }
    _updateMenu(data, id)
      .then((res) => {
        response(resp, res, 200, null)
      })
      .catch((err) => {
        console.log(err.message)
      })
  },
  deleteMenu: (req, resp) => {
    const {id} = req.params
    _deleteMenu(id)
      .then((res) => {
        response(resp, res, 200, null)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}