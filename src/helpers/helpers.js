module.exports = {
	response: (res, result, status, message, links, error) => {
		const resultPrint = {}
		resultPrint.success = !error
		if (!error) {
			resultPrint.status_code = status || null
			resultPrint.message = message || null
		} else {
			resultPrint.error = error
		}
		resultPrint.data = result
		if (links) {
			resultPrint.page_info = links
		}
		return res.status(status).json(resultPrint)
	},
	status: {
		found: 'Data found',
		insert: 'Data successfully added',
		update: 'Data successfully updated',
		delete: 'Data successfully deleted'
	},
	pageInfo: (limit, start, total, count) => {
		const numStart = start === 0 ? 1 : start
		const last = Math.ceil(total / limit)
		const result = {
			total_page: last ? last : 1,
			current_page: numStart,
			next_page: count < limit || numStart === last ? null : numStart + 1,
			prev_page: numStart === 0 || numStart === 1 ? null : numStart - 1,
			first_page: numStart === 1 ? null : 1,
			last_page: numStart === last ? null : last,
			total_item: total,
			per_page: limit,
			count: count
		}
		return result
	},
	errors: {
		notFound: {
			code: 'ERR_NOT_FOUND',
			status_code: 404,
			message: 'Data Not Found'
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
