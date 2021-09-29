const conn = require('../configs/db')
const { errors } = require('./helpers')

module.exports = {
	actionQuery: (...arg) => {
		return new Promise((resolve, reject) => {
			conn.query(...arg, (err, res) => {
				// if (err || res.rowCount <= 0) {
				if (res.rowCount <= 0) {
					const objError = errors.notFound
					reject(objError)
					// } else {
					// }
					// reject(new Error(err))
				} else {
					resolve(res)
					// const objError = {
					// ...err
					// statusCode: errors.checkStatusCode(err.errno)
				}
			})
		})
	}
}
