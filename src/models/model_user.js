const {
  queryHelper
} = require('../helpers/helper_query')

module.exports = {
  registerUser: (data) => {
    return queryHelper('INSERT INTO users SET ?', data)
  },
  getAllAdmin: () => {
    return queryHelper('SELECT * FROM users WHERE role = 1')
  },
  getAllCustomer: () => {
    return queryHelper('SELECT * FROM users WHERE role = 2')
  },
  getUserByEmail: (email) => {
    return queryHelper('SELECT * FROM users WHERE email = ?', email)
  },
  modifyUser: (data, id) => {
    return queryHelper('UPDATE users SET ? WHERE id = ?', [data, id])
  },
  removeUser: (id) => {
    return queryHelper('DELETE FROM users WHERE id = ?', id)
  }
}