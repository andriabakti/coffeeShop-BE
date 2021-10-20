const { verify } = require('jsonwebtoken')
const { response } = require('../helpers/helper_resp')

module.exports = {
  verifyAccess: (req, res, next) => {
    const bearerToken = req.headers.authorization
    // TODO: verifikasi bearer token
    const token = bearerToken.split(' ')[1]
    verify(token, process.env.JWT_KEY, (err, decoded) => {

      // TODO: error handling
      // - jika token salah
      if (err) return response(res, [], 403, 'Invalid Token!', null, err)
      next()
      // - jika token expired

      // TODO: kirim data
      // req.role = decoded.role
      // diteruskan ke controller untuk checkAdmin
      // gunakan if else
    })
  }
}