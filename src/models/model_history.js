const { queryHelper } = require('../helpers/helper_query')

module.exports = {
  insertHistory: (data) => {
    return queryHelper('INSERT INTO histories SET ?', data)
  },
  getAllHistory: () => {
    return queryHelper('SELECT * FROM histories')
  },
  removeHistory: (id) => {
    return queryHelper('DELETE FROM histories WHERE id =?', id)
  }
}