const conn = require('../configs/db')

module.exports = {
	response: (res, result, status, err) => {
		const resultPrint = {}
		resultPrint.status = 'Success'
		resultPrint.status_code = status
		resultPrint.result = result.rows
		resultPrint.err = err || null
		return res.status(resultPrint.status_code).json(resultPrint)
	},
	actionQuery: (...arg) => {
		return new Promise((resolve, reject) => {
			conn.query(...arg, (err, res) => {
				if (!err) {
					resolve(res)
				} else {
					reject(err)
				}
			})
		})
	}
}
