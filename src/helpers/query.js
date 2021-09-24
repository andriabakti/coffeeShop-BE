const conn = require('../configs/db')
const { errors } = require('./helpers')

module.exports = {
	actionQuery: (...arg) => {
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
