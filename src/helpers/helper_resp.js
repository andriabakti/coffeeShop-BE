module.exports = {
  response: (res, result, status, message, link, error) => {
    return res.status(status).json({
      success: error !== null ? "Failed" : "Success",
      status_code: status || 500,
      message: message || null,
      data: result || [],
      page_info: link || null
    })
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
  }
}
