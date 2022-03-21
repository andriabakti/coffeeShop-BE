// package: jsonwebtoken
const { verify } = require('jsonwebtoken')
// helper: response
const { response } = require('../helpers/helper_resp')

module.exports = {
  verifyAccess: (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    // TODO: verifikasi bearer token
    verify(token, process.env.JWT_KEY, (err, _decoded) => {

      // TODO: error handling
      // - jika token salah
      if (err) return response(res, [], 403, 'Invalid Token!', null, err)
      next()
      // - jika token expired

      // TODO: kirim data
      // req.role = decoded.role
      // req.nama = 'Andria'
      // diteruskan ke controller untuk checkAdmin
      // gunakan if else
    })
  }
}
