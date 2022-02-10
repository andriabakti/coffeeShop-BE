const { queryHelper } = require('../helpers/helper_query')

module.exports = {
  createUser: (data) => {
    return queryHelper('INSERT INTO users SET ?', data)
  },
  createUserDetail: (data) => {
    return queryHelper('INSERT INTO user_details SET ?', data)
  },
  getAllCustomer: () => {
    return queryHelper('SELECT * FROM users WHERE role = 2')
  },
  getAllAdmin: () => {
    return queryHelper('SELECT * FROM users WHERE role = 1')
  },
  getUserByEmail: (email) => {
    return queryHelper('SELECT * FROM users WHERE email = ?', email)
  },
  getUserDetailById: (id) => {
    return queryHelper(
      `SELECT user_details.*, users.* FROM user_details
      INNER JOIN users ON user_details.user_id = users.id
      WHERE user_details.user_id = ?`,
      id
    )
  },
  checkImage: (id) => {
    return queryHelper('SELECT image FROM user_details WHERE user_id = ?', id)
  },
  modifyUser: (data, detail, id) => {
    const { username, email, phone, updated_at } = data
    const { first_name, last_name, birth_date, gender, address, image } = detail
    return queryHelper(
      `UPDATE users A INNER JOIN user_details B ON A.id = B.user_id
      SET A.username = ?, A.email = ?, A.phone = ?, A.updated_at = ?,
      B.first_name = ?, B.last_name = ?, B.birth_date = ?, B.gender = ?,
      B.address = ?, B.image = ?, B.updated_at = ?
      WHERE A.id = ? AND B.user_id = ?`,
      [
        username,
        email,
        phone,
        updated_at,
        first_name,
        last_name,
        birth_date,
        gender,
        address,
        image,
        detail.updated_at,
        id,
        id
      ]
    )
  },
  removeUser: (id) => {
    return queryHelper('DELETE FROM users WHERE users.id = ?', id)
  }
}
