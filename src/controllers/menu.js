const {_getAllMenu, _insertMenu} = require('../models/menu')
const { response } = require('../helpers/helpers')

module.exports = {
  getAllMenu: (_req, resp) => {
    _getAllMenu()
    .then((res) => {
      response(resp, res, 200, null)
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err)
    })
  }
}