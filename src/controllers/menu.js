const {_getAllMenu} = require('../models/menu')
const { response } = require('../helpers/helpers')

module.exports = {
  getAllMenu: (_req, res) => {
    _getAllMenu()
    .then((result) => {
      response(res, result, 200, null)
    })
    .catch((err) => {
      console.log(err);
    })
  }
}