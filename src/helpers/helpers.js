module.exports = {
	response: (res, result, status, message, pageInfo, error) => {
		const resultPrint = {}
		if (pageInfo) {
			resultPrint.total = pageInfo.total
			resultPrint.per_page = pageInfo.per_page
			resultPrint.count = pageInfo.count
			resultPrint.current_page = pageInfo.current_page
			resultPrint.total_pages = pageInfo.total_pages
			resultPrint.links = pageInfo.links
		}
		resultPrint.success = !error
		resultPrint.status_code = status
		if (error) {
			resultPrint.err = err || null
		}
		if (message) {
			resultPrint.message = message
		}
		resultPrint.result = result.rows
		return res.status(status).json(resultPrint)
	},
	status: {
		found: 'Data found',
		insert: 'Data successfully added',
		update: 'Data successfully updated',
		delete: 'Data successfully deleted'
	},
	pageInfo: (limit, start, total, count) => {
		const last = Math.ceil(total / limit)
		const numStart = start === 0 ? 1 : start
		const result = {
			per_page: limit,
			count: count,
			total: total,
			current_page: numStart,
			total_pages: last ? last : 1,
			links: {
				self: numStart,
				next: count < limit || numStart === last ? null : numStart + 1,
				prev: numStart === 0 || numStart === 1 ? null : numStart - 1,
				first: numStart === 1 ? null : 1,
				last: numStart === last ? null : last
			}
		}
		return result
	},
	errors: {
		notFound: {
			code: 'ERR_NOT_FOUND',
			statusCode: 404,
			sqlMessage: 'Data Not Found'
		},
		checkStatusCode: (errorCode) => {
			const errorCodes = Number(errorCode)
			if (errorCodes === 1048 || errorCodes === 1366) {
				return 400
			} else if (
				errorCodes === 1146 ||
				errorCodes === 1054 ||
				errorCodes === 1051
			) {
				return 500
			} else {
				return 400
			}
		}
	}
}
