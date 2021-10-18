const conn = require('../configs/connection')
const { errors } = require('./response')

module.exports = {
	queryHelper: (...arg) => {
		return new Promise((resolve, reject) => {
			conn.query(...arg, (err, res) => {
				if (!err) {
					if (res.length <= 0 || res.affectedRows === 0) {
						const objError = errors.notFound
						reject(objError)
					} else {
						resolve(res)
					}
				} else {
					const objError = {
						...err,
						statusCode: errors.checkStatusCode(err.errno)
					}
					reject(objError)
				}
			})
		})
	}
}
