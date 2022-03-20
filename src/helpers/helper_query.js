const conn = require('../configs/config_conn')
const { errors } = require('./helper_resp')

module.exports = {
	queryAction: (...args) => {
		return new Promise((resolve, reject) => {
			conn.query(...args, (err, res) => {
				if (!err) {
					if (res.length <= 0 || res.affectedRows === 0) {
						const errorObject = errors.notFound
						reject(errorObject)
					} else {
						resolve(res)
					}
				} else {
					const errorObject = {
						...err,
						statusCode: errors.checkStatusCode(err.errno)
					}
					reject(errorObject)
				}
			})
		})
	}
}
