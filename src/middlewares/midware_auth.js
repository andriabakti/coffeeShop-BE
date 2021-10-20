const { verify } = require('jsonwebtoken')
const { response } = require('../helpers/helper_resp')

module.exports = {
  verifyAccess: (req, res, next) => {
    const bearerToken = req.headers.authorization
    // verifikasi bearer token
    const token = bearerToken.split(' ')[1]
    verify(token, process.env.JWT_KEY, (err, decoded) => {
      // req.role = decoded.role
      // diteruskan ke controller untuk checkAdmin

      // error handling
      // jika token salah
      if (err) return response(res, [], 403, 'Invalid Token!', null, err)
      next()
      // jika token expired
    })
  }
  // refresh token
}